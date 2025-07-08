/**
 * Infrastructure Configuration for learner10x.com
 * Phase 1, Task 1: Infrastructure Setup (#40)
 * 
 * This file contains all infrastructure-related configurations
 * for development, staging, and production environments.
 */

const infrastructureConfig = {
  // Environment configurations
  environments: {
    development: {
      name: 'development',
      port: 3000,
      host: 'localhost',
      protocol: 'http',
      database: {
        type: 'sqlite',
        path: './data/dev.db',
        logging: true,
        synchronize: true
      },
      redis: {
        host: 'localhost',
        port: 6379,
        db: 0
      },
      monitoring: {
        enabled: true,
        level: 'debug',
        performance: true
      },
      security: {
        cors: {
          origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
          credentials: true
        },
        rateLimit: {
          windowMs: 15 * 60 * 1000, // 15 minutes
          max: 1000 // requests per window
        }
      }
    },
    
    staging: {
      name: 'staging',
      port: process.env.PORT || 3000,
      host: process.env.HOST || '0.0.0.0',
      protocol: 'https',
      database: {
        type: 'postgresql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: true,
        logging: false,
        synchronize: false
      },
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD,
        db: 0,
        tls: true
      },
      monitoring: {
        enabled: true,
        level: 'info',
        performance: true,
        apm: {
          serviceName: 'learner10x-staging',
          environment: 'staging'
        }
      },
      security: {
        cors: {
          origin: [process.env.STAGING_URL],
          credentials: true
        },
        rateLimit: {
          windowMs: 15 * 60 * 1000,
          max: 500
        }
      }
    },
    
    production: {
      name: 'production',
      port: process.env.PORT || 3000,
      host: process.env.HOST || '0.0.0.0',
      protocol: 'https',
      database: {
        type: 'postgresql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: true,
        logging: false,
        synchronize: false,
        pool: {
          min: 2,
          max: 10,
          idle: 10000,
          acquire: 30000
        }
      },
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD,
        db: 0,
        tls: true,
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: 3
      },
      monitoring: {
        enabled: true,
        level: 'warn',
        performance: true,
        apm: {
          serviceName: 'learner10x-production',
          environment: 'production'
        },
        healthCheck: {
          enabled: true,
          interval: 30000,
          timeout: 5000
        }
      },
      security: {
        cors: {
          origin: [process.env.PRODUCTION_URL, 'https://learner10x.com'],
          credentials: true
        },
        rateLimit: {
          windowMs: 15 * 60 * 1000,
          max: 100
        },
        helmet: {
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
              fontSrc: ["'self'", "https://fonts.gstatic.com"],
              imgSrc: ["'self'", "data:", "https:"],
              scriptSrc: ["'self'", "'unsafe-eval'", "https://www.googletagmanager.com"],
              connectSrc: ["'self'", "https://api.learner10x.com"]
            }
          }
        }
      }
    }
  },

  // Performance configurations
  performance: {
    caching: {
      static: {
        maxAge: 31536000, // 1 year
        immutable: true
      },
      api: {
        maxAge: 3600, // 1 hour
        staleWhileRevalidate: 86400 // 24 hours
      },
      pages: {
        maxAge: 300, // 5 minutes
        staleWhileRevalidate: 3600 // 1 hour
      }
    },
    compression: {
      enabled: true,
      level: 6,
      threshold: 1024
    },
    bundleOptimization: {
      splitChunks: true,
      treeShaking: true,
      minification: true
    }
  },

  // Monitoring and logging
  monitoring: {
    metrics: {
      enabled: true,
      interval: 10000,
      retention: '7d'
    },
    logging: {
      format: 'json',
      level: process.env.LOG_LEVEL || 'info',
      transports: ['console', 'file'],
      rotation: {
        maxFiles: 5,
        maxSize: '10m'
      }
    },
    alerts: {
      enabled: true,
      thresholds: {
        errorRate: 0.05,
        responseTime: 2000,
        memoryUsage: 0.8,
        cpuUsage: 0.8
      }
    }
  },

  // Deployment configurations
  deployment: {
    docker: {
      enabled: true,
      registry: process.env.DOCKER_REGISTRY || 'ghcr.io',
      image: 'learner10x/app',
      tag: process.env.DOCKER_TAG || 'latest'
    },
    kubernetes: {
      enabled: true,
      namespace: process.env.K8S_NAMESPACE || 'learner10x',
      replicas: {
        min: 2,
        max: 10,
        target: 3
      },
      resources: {
        requests: {
          cpu: '100m',
          memory: '128Mi'
        },
        limits: {
          cpu: '500m',
          memory: '512Mi'
        }
      }
    },
    cdn: {
      enabled: true,
      provider: 'cloudflare',
      zones: {
        static: process.env.CDN_STATIC_ZONE,
        api: process.env.CDN_API_ZONE
      }
    }
  },

  // Feature flags
  features: {
    authentication: {
      enabled: true,
      providers: ['email', 'google', 'github']
    },
    analytics: {
      enabled: true,
      providers: ['gtm', 'plausible']
    },
    search: {
      enabled: true,
      provider: 'elasticsearch'
    },
    cms: {
      enabled: true,
      provider: 'strapi'
    },
    ai: {
      enabled: false,
      provider: 'openai'
    }
  }
}

// Get current environment configuration
function getCurrentConfig() {
  const env = process.env.NODE_ENV || 'development'
  return {
    ...infrastructureConfig,
    current: infrastructureConfig.environments[env] || infrastructureConfig.environments.development
  }
}

// Validate configuration
function validateConfig(config) {
  const required = ['name', 'port', 'host', 'protocol']
  const missing = required.filter(key => !config[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required configuration: ${missing.join(', ')}`)
  }
  
  return true
}

// Export configuration
module.exports = {
  infrastructureConfig,
  getCurrentConfig,
  validateConfig
}
