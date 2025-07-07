# Database Migration Strategies

## Overview

Database migrations are critical for maintaining data integrity while evolving your application schema. This guide covers safe migration patterns, rollback procedures, and best practices for zero-downtime deployments.

## Migration Types

### Schema Changes
- **Additive**: New tables, columns, indexes (safe)
- **Destructive**: Dropping tables/columns (requires careful planning)
- **Transformative**: Data type changes, constraints (complex)

### Data Migrations
- **Seed Data**: Initial application data
- **Data Transformation**: Converting existing data
- **Data Cleanup**: Removing obsolete data

## Safe Migration Patterns

### 1. Expand-Contract Pattern
```python
# Step 1: Expand (add new column)
class Migration001_AddEmailColumn(Migration):
    def up(self):
        # Add nullable column first
        self.add_column('users', 'email_address', 'VARCHAR(255)', nullable=True)
    
    def down(self):
        self.drop_column('users', 'email_address')

# Step 2: Dual Write (application code)
def update_user(user_id, email=None, email_address=None):
    # Write to both old and new columns during transition
    updates = {}
    if email:
        updates['email'] = email
        updates['email_address'] = email  # Dual write
    # Execute update...

# Step 3: Migrate Data
class Migration002_MigrateEmailData(Migration):
    def up(self):
        # Copy data from old to new column
        self.execute("""
            UPDATE users 
            SET email_address = email 
            WHERE email_address IS NULL AND email IS NOT NULL
        """)
    
    def down(self):
        self.execute("""
            UPDATE users 
            SET email = email_address 
            WHERE email IS NULL AND email_address IS NOT NULL
        """)

# Step 4: Contract (remove old column)
class Migration003_RemoveOldEmailColumn(Migration):
    def up(self):
        self.drop_column('users', 'email')
    
    def down(self):
        self.add_column('users', 'email', 'VARCHAR(255)', nullable=True)
```

### 2. Blue-Green Migrations
```python
# Create new table version
class Migration_CreateUsersV2(Migration):
    def up(self):
        self.create_table('users_v2', [
            ('id', 'SERIAL PRIMARY KEY'),
            ('full_name', 'VARCHAR(255) NOT NULL'),  # Combined field
            ('email_address', 'VARCHAR(255) UNIQUE NOT NULL'),
            ('created_at', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP')
        ])
    
    def down(self):
        self.drop_table('users_v2')

# Migrate data in batches
def migrate_users_batch(batch_size=1000):
    offset = 0
    while True:
        users = db.execute(f"""
            SELECT id, first_name, last_name, email 
            FROM users 
            ORDER BY id 
            LIMIT {batch_size} OFFSET {offset}
        """).fetchall()
        
        if not users:
            break
            
        for user in users:
            db.execute("""
                INSERT INTO users_v2 (id, full_name, email_address, created_at)
                VALUES (%s, %s, %s, %s)
                ON CONFLICT (id) DO NOTHING
            """, (
                user.id,
                f"{user.first_name} {user.last_name}",
                user.email,
                user.created_at
            ))
        
        offset += batch_size
        db.commit()

# Switch tables atomically
class Migration_SwitchToUsersV2(Migration):
    def up(self):
        self.execute("BEGIN")
        self.execute("ALTER TABLE users RENAME TO users_old")
        self.execute("ALTER TABLE users_v2 RENAME TO users")
        self.execute("COMMIT")
    
    def down(self):
        self.execute("BEGIN")
        self.execute("ALTER TABLE users RENAME TO users_v2")
        self.execute("ALTER TABLE users_old RENAME TO users")
        self.execute("COMMIT")
```

## Zero-Downtime Strategies

### 1. Backwards Compatible Changes
```python
# Safe: Adding nullable column
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

# Safe: Adding index
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);

# Safe: Adding table
CREATE TABLE user_preferences (...);

# Unsafe: Dropping column (breaks old app versions)
# ALTER TABLE users DROP COLUMN old_field;

# Unsafe: Changing column type
# ALTER TABLE users ALTER COLUMN age TYPE BIGINT;
```

### 2. Feature Flags for Schema Changes
```python
# Use feature flags to control when new schema is used
class UserService:
    def __init__(self):
        self.use_new_schema = feature_flag('use_users_v2_table')
    
    def get_user(self, user_id):
        if self.use_new_schema:
            return self.get_user_from_v2(user_id)
        else:
            return self.get_user_from_v1(user_id)
```

## Migration Tools & Configuration

### Alembic Configuration
```python
# alembic.ini
[alembic]
script_location = migrations
sqlalchemy.url = postgresql://user:pass@localhost/db

# Version table schema
version_table = alembic_version
version_table_schema = public

# Migration environment
[logger_alembic]
level = INFO
handlers = 
qualname = alembic

# env.py
from alembic import context
from sqlalchemy import engine_from_config
from app.models import Base

def run_migrations_online():
    connectable = engine_from_config(
        context.config.get_section(context.config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=Base.metadata,
            transaction_per_migration=True,  # Important for rollbacks
            compare_type=True,
            compare_server_default=True
        )

        with context.begin_transaction():
            context.run_migrations()
```

### Migration Scripts
```bash
#!/bin/bash
# scripts/migrate.sh

set -e

echo "🔄 Starting database migration..."

# Backup database
echo "📦 Creating backup..."
pg_dump $DATABASE_URL > "backup_$(date +%Y%m%d_%H%M%S).sql"

# Run migrations
echo "🏃 Running migrations..."
alembic upgrade head

# Verify migration
echo "✅ Verifying migration..."
python scripts/verify_migration.py

echo "✅ Migration completed successfully!"
```

## Testing Migrations

### Migration Testing Framework
```python
# tests/test_migrations.py
import pytest
from alembic import command
from alembic.config import Config
from sqlalchemy import create_engine

class TestMigrations:
    def test_migration_up_down(self, db_engine):
        """Test that migrations can be applied and rolled back"""
        alembic_cfg = Config("alembic.ini")
        
        # Get current revision
        current_rev = self.get_current_revision(db_engine)
        
        # Apply next migration
        command.upgrade(alembic_cfg, "+1")
        
        # Verify schema changes
        self.verify_schema_changes(db_engine)
        
        # Rollback
        command.downgrade(alembic_cfg, current_rev)
        
        # Verify rollback
        self.verify_rollback(db_engine)
    
    def test_data_migration(self, db_session):
        """Test data migrations preserve data integrity"""
        # Insert test data
        test_user = User(name="Test", email="test@example.com")
        db_session.add(test_user)
        db_session.commit()
        
        # Run migration
        command.upgrade(alembic_cfg, "+1")
        
        # Verify data preserved
        migrated_user = db_session.query(User).first()
        assert migrated_user.name == "Test"
        assert migrated_user.email == "test@example.com"
```

## Rollback Strategies

### Immediate Rollback
```bash
# Emergency rollback script
#!/bin/bash
# scripts/emergency_rollback.sh

PREVIOUS_REVISION=$1

if [ -z "$PREVIOUS_REVISION" ]; then
    echo "❌ Error: Previous revision required"
    echo "Usage: $0 <previous_revision>"
    exit 1
fi

echo "🚨 EMERGENCY ROLLBACK to $PREVIOUS_REVISION"
echo "This will:"
echo "  1. Stop application"
echo "  2. Rollback database"
echo "  3. Restart application"

read -p "Continue? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "❌ Rollback cancelled"
    exit 1
fi

# Stop application
echo "🛑 Stopping application..."
systemctl stop myapp

# Rollback database
echo "🔄 Rolling back database..."
alembic downgrade $PREVIOUS_REVISION

# Restart application
echo "🚀 Starting application..."
systemctl start myapp

echo "✅ Rollback completed!"
```

### Progressive Rollback
```python
# For complex migrations, use progressive rollback
class Migration_ComplexChange(Migration):
    def up(self):
        # Step 1: Prepare
        self.create_temp_tables()
        
        # Step 2: Migrate data
        self.migrate_data_safely()
        
        # Step 3: Switch
        self.atomic_table_switch()
        
        # Step 4: Cleanup
        self.cleanup_old_data()
    
    def down(self):
        # Reverse each step carefully
        self.restore_old_data()
        self.reverse_table_switch()
        self.cleanup_temp_tables()
```

## Best Practices

### Development Workflow
```bash
# 1. Create migration
alembic revision --autogenerate -m "Add user preferences table"

# 2. Review generated migration
# Edit migration file to add custom logic

# 3. Test migration locally
alembic upgrade head
alembic downgrade -1
alembic upgrade head

# 4. Test with real data
python scripts/test_migration_with_data.py

# 5. Deploy to staging
# 6. Deploy to production
```

### Production Deployment
```yaml
# Migration deployment pipeline
migration_deploy:
  steps:
    - name: "Backup Database"
      run: pg_dump $PROD_DB > backup_$(date +%Y%m%d_%H%M%S).sql
    
    - name: "Run Migration (Dry Run)"
      run: alembic upgrade head --sql > migration.sql
    
    - name: "Review Migration SQL"
      run: cat migration.sql
    
    - name: "Apply Migration"
      run: alembic upgrade head
    
    - name: "Verify Migration"
      run: python scripts/verify_production_migration.py
    
    - name: "Monitor Application"
      run: python scripts/monitor_post_migration.py
```

### Monitoring & Alerting
```python
# Post-migration monitoring
class MigrationMonitor:
    def __init__(self):
        self.metrics = MetricsClient()
        self.alerts = AlertManager()
    
    def monitor_post_migration(self, duration_minutes=30):
        start_time = time.time()
        
        while time.time() - start_time < duration_minutes * 60:
            # Check database performance
            if self.check_db_performance():
                self.alerts.send_warning("Database performance degraded")
            
            # Check application errors
            if self.check_error_rate():
                self.alerts.send_critical("High error rate detected")
            
            # Check data integrity
            if self.check_data_integrity():
                self.alerts.send_critical("Data integrity issues found")
            
            time.sleep(60)  # Check every minute
```

## Emergency Procedures

### Migration Failure Recovery
```bash
# If migration fails mid-way
1. Stop application traffic
2. Assess database state
3. Restore from backup if necessary
4. Fix migration script
5. Re-run migration
6. Verify data integrity
7. Resume traffic
```

### Data Loss Prevention
- Always backup before migrations
- Test migrations on production-like data
- Use transactions for atomic operations
- Implement data validation checks
- Monitor for data anomalies post-migration

This guide provides a foundation for safe, reliable database migrations that support continuous deployment while maintaining data integrity. 