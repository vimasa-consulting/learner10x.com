# Feature Flags

## Overview

Feature flags (also known as feature toggles) enable teams to deploy code safely, test features in production, and control feature rollouts. This guide covers implementation patterns, testing strategies, and gradual rollout approaches.

## Feature Flag Types

### 1. Release Toggles
```python
# backend/app/core/feature_flags.py
from enum import Enum
from typing import Dict, Any, Optional
import os

class FeatureFlag(Enum):
    NEW_USER_DASHBOARD = "new_user_dashboard"
    PAYMENT_V2 = "payment_v2"
    ADVANCED_SEARCH = "advanced_search"
    BETA_FEATURES = "beta_features"
    MAINTENANCE_MODE = "maintenance_mode"

class FeatureFlagService:
    def __init__(self):
        self.flags: Dict[str, bool] = {}
        self.user_flags: Dict[str, Dict[str, bool]] = {}
        self.percentage_rollouts: Dict[str, int] = {}
        self._load_config()
    
    def _load_config(self):
        """Load feature flags from environment or config"""
        self.flags = {
            FeatureFlag.NEW_USER_DASHBOARD.value: os.getenv("FF_NEW_USER_DASHBOARD", "false").lower() == "true",
            FeatureFlag.PAYMENT_V2.value: os.getenv("FF_PAYMENT_V2", "false").lower() == "true",
            FeatureFlag.ADVANCED_SEARCH.value: os.getenv("FF_ADVANCED_SEARCH", "false").lower() == "true",
            FeatureFlag.BETA_FEATURES.value: os.getenv("FF_BETA_FEATURES", "false").lower() == "true",
            FeatureFlag.MAINTENANCE_MODE.value: os.getenv("FF_MAINTENANCE_MODE", "false").lower() == "true",
        }
        
        # Percentage rollouts
        self.percentage_rollouts = {
            FeatureFlag.NEW_USER_DASHBOARD.value: int(os.getenv("FF_NEW_USER_DASHBOARD_PERCENT", "0")),
            FeatureFlag.PAYMENT_V2.value: int(os.getenv("FF_PAYMENT_V2_PERCENT", "0")),
        }
    
    def is_enabled(self, flag: FeatureFlag, user_id: Optional[str] = None, context: Optional[Dict[str, Any]] = None) -> bool:
        """Check if feature flag is enabled"""
        flag_name = flag.value
        
        # Check global flag first
        if not self.flags.get(flag_name, False):
            return False
        
        # Check user-specific override
        if user_id and user_id in self.user_flags:
            if flag_name in self.user_flags[user_id]:
                return self.user_flags[user_id][flag_name]
        
        # Check percentage rollout
        if flag_name in self.percentage_rollouts and user_id:
            percentage = self.percentage_rollouts[flag_name]
            if percentage > 0:
                user_hash = hash(f"{flag_name}:{user_id}") % 100
                return user_hash < percentage
        
        # Check context-based rules
        if context:
            return self._evaluate_context_rules(flag, context)
        
        return self.flags.get(flag_name, False)
    
    def _evaluate_context_rules(self, flag: FeatureFlag, context: Dict[str, Any]) -> bool:
        """Evaluate context-based feature flag rules"""
        # Example: Beta features only for beta users
        if flag == FeatureFlag.BETA_FEATURES:
            return context.get("user_type") == "beta"
        
        # Example: Advanced search for premium users
        if flag == FeatureFlag.ADVANCED_SEARCH:
            return context.get("subscription") in ["premium", "enterprise"]
        
        return True
    
    def set_user_flag(self, user_id: str, flag: FeatureFlag, enabled: bool):
        """Set user-specific feature flag override"""
        if user_id not in self.user_flags:
            self.user_flags[user_id] = {}
        self.user_flags[user_id][flag.value] = enabled

# Global instance
feature_flags = FeatureFlagService()
```

### 2. Usage in Code
```python
# backend/app/api/endpoints/users.py
from fastapi import APIRouter, Depends
from app.core.feature_flags import feature_flags, FeatureFlag
from app.services.user_service import UserService

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard(current_user = Depends(get_current_user)):
    """Get user dashboard with feature flag support"""
    
    if feature_flags.is_enabled(
        FeatureFlag.NEW_USER_DASHBOARD, 
        user_id=str(current_user.id),
        context={"user_type": current_user.type}
    ):
        # New dashboard
        return await UserService.get_new_dashboard(current_user.id)
    else:
        # Legacy dashboard
        return await UserService.get_legacy_dashboard(current_user.id)

@router.post("/payment")
async def process_payment(payment_data: dict, current_user = Depends(get_current_user)):
    """Process payment with feature flag for new payment system"""
    
    if feature_flags.is_enabled(FeatureFlag.PAYMENT_V2, user_id=str(current_user.id)):
        from app.services.payment_v2_service import PaymentV2Service
        return await PaymentV2Service.process_payment(payment_data)
    else:
        from app.services.payment_service import PaymentService
        return await PaymentService.process_payment(payment_data)
```

## Frontend Implementation

### 1. React Feature Flag Hook
```typescript
// frontend/src/hooks/useFeatureFlag.ts
import { useContext, createContext } from 'react';

interface FeatureFlagContextType {
  isEnabled: (flag: string) => boolean;
  flags: Record<string, boolean>;
}

export const FeatureFlagContext = createContext<FeatureFlagContextType>({
  isEnabled: () => false,
  flags: {}
});

export const useFeatureFlag = () => {
  return useContext(FeatureFlagContext);
};

// frontend/src/providers/FeatureFlagProvider.tsx
import React, { useState, useEffect } from 'react';
import { FeatureFlagContext } from '../hooks/useFeatureFlag';

interface FeatureFlagProviderProps {
  children: React.ReactNode;
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({ children }) => {
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Fetch feature flags from API
    const fetchFlags = async () => {
      try {
        const response = await fetch('/api/feature-flags');
        const data = await response.json();
        setFlags(data.flags);
      } catch (error) {
        console.error('Failed to fetch feature flags:', error);
      }
    };
    
    fetchFlags();
  }, []);
  
  const isEnabled = (flag: string) => {
    return flags[flag] || false;
  };
  
  return (
    <FeatureFlagContext.Provider value={{ isEnabled, flags }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
```

### 2. Feature Flag Component
```typescript
// frontend/src/components/FeatureFlag.tsx
import React from 'react';
import { useFeatureFlag } from '../hooks/useFeatureFlag';

interface FeatureFlagProps {
  flag: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const FeatureFlag: React.FC<FeatureFlagProps> = ({ 
  flag, 
  fallback = null, 
  children 
}) => {
  const { isEnabled } = useFeatureFlag();
  
  if (isEnabled(flag)) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
};

// Usage example
const UserDashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <FeatureFlag 
        flag="new_user_dashboard"
        fallback={<LegacyDashboard />}
      >
        <NewDashboard />
      </FeatureFlag>
      
      <FeatureFlag flag="advanced_search">
        <AdvancedSearchComponent />
      </FeatureFlag>
    </div>
  );
};
```

## Gradual Rollouts

### 1. Percentage-Based Rollouts
```python
# backend/app/services/rollout_service.py
import hashlib
from typing import Optional

class RolloutService:
    @staticmethod
    def is_user_in_rollout(feature: str, user_id: str, percentage: int) -> bool:
        """Determine if user is in percentage-based rollout"""
        if percentage == 0:
            return False
        if percentage >= 100:
            return True
        
        # Create consistent hash for user and feature
        hash_input = f"{feature}:{user_id}"
        hash_value = hashlib.md5(hash_input.encode()).hexdigest()
        hash_int = int(hash_value[:8], 16) % 100
        
        return hash_int < percentage
    
    @staticmethod
    def is_user_in_cohort(user_id: str, cohorts: list) -> bool:
        """Check if user belongs to specific cohorts"""
        user_hash = hash(user_id) % 100
        return any(
            cohort['start'] <= user_hash < cohort['end'] 
            for cohort in cohorts
        )

# Usage in feature flag service
def is_enabled_with_rollout(self, flag: FeatureFlag, user_id: Optional[str] = None) -> bool:
    flag_name = flag.value
    
    # Check if feature is enabled globally
    if not self.flags.get(flag_name, False):
        return False
    
    if user_id:
        # Check percentage rollout
        percentage = self.percentage_rollouts.get(flag_name, 0)
        if percentage > 0:
            return RolloutService.is_user_in_rollout(flag_name, user_id, percentage)
    
    return False
```

### 2. Ring-Based Deployments
```python
# backend/app/core/deployment_rings.py
from enum import Enum

class DeploymentRing(Enum):
    CANARY = "canary"      # 1% of users
    EARLY = "early"        # 10% of users
    BROAD = "broad"        # 50% of users
    FULL = "full"          # 100% of users

class RingDeploymentService:
    RING_PERCENTAGES = {
        DeploymentRing.CANARY: 1,
        DeploymentRing.EARLY: 10,
        DeploymentRing.BROAD: 50,
        DeploymentRing.FULL: 100,
    }
    
    def __init__(self):
        self.feature_rings: Dict[str, DeploymentRing] = {}
    
    def set_feature_ring(self, feature: str, ring: DeploymentRing):
        """Set deployment ring for a feature"""
        self.feature_rings[feature] = ring
    
    def is_user_in_ring(self, feature: str, user_id: str) -> bool:
        """Check if user is in current deployment ring for feature"""
        ring = self.feature_rings.get(feature, DeploymentRing.FULL)
        percentage = self.RING_PERCENTAGES[ring]
        
        return RolloutService.is_user_in_rollout(feature, user_id, percentage)
```

## A/B Testing Integration

### 1. A/B Test Configuration
```python
# backend/app/services/ab_test_service.py
from dataclasses import dataclass
from typing import Dict, List, Optional
import random

@dataclass
class ABTestVariant:
    name: str
    weight: int
    config: Dict[str, any]

@dataclass
class ABTest:
    name: str
    variants: List[ABTestVariant]
    traffic_allocation: int  # Percentage of users in test

class ABTestService:
    def __init__(self):
        self.tests: Dict[str, ABTest] = {}
    
    def register_test(self, test: ABTest):
        """Register A/B test"""
        self.tests[test.name] = test
    
    def get_variant(self, test_name: str, user_id: str) -> Optional[str]:
        """Get variant for user in A/B test"""
        test = self.tests.get(test_name)
        if not test:
            return None
        
        # Check if user is in test
        if not RolloutService.is_user_in_rollout(test_name, user_id, test.traffic_allocation):
            return None
        
        # Assign variant based on weights
        total_weight = sum(variant.weight for variant in test.variants)
        user_hash = hash(f"{test_name}:{user_id}") % total_weight
        
        current_weight = 0
        for variant in test.variants:
            current_weight += variant.weight
            if user_hash < current_weight:
                return variant.name
        
        return test.variants[0].name  # Fallback

# Usage
ab_test_service = ABTestService()

# Register A/B test
ab_test_service.register_test(ABTest(
    name="checkout_flow_test",
    variants=[
        ABTestVariant("control", 50, {"flow": "standard"}),
        ABTestVariant("variant_a", 25, {"flow": "simplified"}),
        ABTestVariant("variant_b", 25, {"flow": "multi_step"}),
    ],
    traffic_allocation=20  # 20% of users in test
))
```

## Configuration Management

### 1. Environment-Based Configuration
```yaml
# config/feature-flags.yaml
development:
  new_user_dashboard: true
  payment_v2: false
  advanced_search: true
  beta_features: true

staging:
  new_user_dashboard: true
  payment_v2: true
  advanced_search: true
  beta_features: true

production:
  new_user_dashboard: false
  payment_v2: false
  advanced_search: false
  beta_features: false

# Rollout percentages
rollouts:
  production:
    new_user_dashboard: 5
    payment_v2: 1
    advanced_search: 10
```

### 2. Runtime Configuration API
```python
# backend/app/api/endpoints/admin.py
from fastapi import APIRouter, Depends
from app.core.feature_flags import feature_flags, FeatureFlag
from app.core.auth import require_admin

router = APIRouter(prefix="/admin")

@router.get("/feature-flags")
async def get_feature_flags(admin_user = Depends(require_admin)):
    """Get all feature flags status"""
    return {
        "flags": feature_flags.flags,
        "percentage_rollouts": feature_flags.percentage_rollouts
    }

@router.post("/feature-flags/{flag_name}/enable")
async def enable_feature_flag(
    flag_name: str, 
    admin_user = Depends(require_admin)
):
    """Enable feature flag"""
    if flag_name in [f.value for f in FeatureFlag]:
        feature_flags.flags[flag_name] = True
        return {"message": f"Feature flag {flag_name} enabled"}
    return {"error": "Invalid feature flag"}

@router.post("/feature-flags/{flag_name}/user/{user_id}")
async def set_user_feature_flag(
    flag_name: str,
    user_id: str,
    enabled: bool,
    admin_user = Depends(require_admin)
):
    """Set feature flag for specific user"""
    try:
        flag = FeatureFlag(flag_name)
        feature_flags.set_user_flag(user_id, flag, enabled)
        return {"message": f"User {user_id} flag {flag_name} set to {enabled}"}
    except ValueError:
        return {"error": "Invalid feature flag"}
```

## Testing Strategies

### 1. Feature Flag Testing
```python
# tests/test_feature_flags.py
import pytest
from app.core.feature_flags import FeatureFlagService, FeatureFlag

class TestFeatureFlags:
    def setup_method(self):
        self.feature_service = FeatureFlagService()
    
    def test_global_flag_enabled(self):
        """Test global feature flag enabled"""
        self.feature_service.flags[FeatureFlag.NEW_USER_DASHBOARD.value] = True
        assert self.feature_service.is_enabled(FeatureFlag.NEW_USER_DASHBOARD)
    
    def test_percentage_rollout(self):
        """Test percentage-based rollout"""
        self.feature_service.flags[FeatureFlag.PAYMENT_V2.value] = True
        self.feature_service.percentage_rollouts[FeatureFlag.PAYMENT_V2.value] = 50
        
        # Test with known user IDs
        enabled_count = sum(
            1 for i in range(100)
            if self.feature_service.is_enabled(FeatureFlag.PAYMENT_V2, user_id=str(i))
        )
        
        # Should be approximately 50% (with some variance)
        assert 40 <= enabled_count <= 60
    
    def test_user_override(self):
        """Test user-specific feature flag override"""
        self.feature_service.flags[FeatureFlag.BETA_FEATURES.value] = False
        self.feature_service.set_user_flag("user123", FeatureFlag.BETA_FEATURES, True)
        
        assert self.feature_service.is_enabled(FeatureFlag.BETA_FEATURES, "user123")
        assert not self.feature_service.is_enabled(FeatureFlag.BETA_FEATURES, "user456")
```

### 2. Integration Testing
```python
# tests/integration/test_feature_flag_endpoints.py
def test_dashboard_with_feature_flag(client, auth_headers):
    """Test dashboard endpoint with feature flag"""
    # Test with flag disabled
    response = client.get("/dashboard", headers=auth_headers)
    data = response.json()
    assert "legacy" in data["dashboard_type"]
    
    # Enable flag for user
    admin_response = client.post(
        "/admin/feature-flags/new_user_dashboard/user/test_user",
        json={"enabled": True},
        headers=admin_headers
    )
    assert admin_response.status_code == 200
    
    # Test with flag enabled
    response = client.get("/dashboard", headers=auth_headers)
    data = response.json()
    assert "new" in data["dashboard_type"]
```

This comprehensive feature flag system enables safe deployments, gradual rollouts, and A/B testing while maintaining code quality and testability. 