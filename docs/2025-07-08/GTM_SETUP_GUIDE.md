# GTM Setup Guide for Frontend Integration

## 🎯 **Overview**

Ana has completed the GTM and GA4 setup. This guide provides the frontend team with the information needed to complete the GTM integration.

---

## 📋 **What Ana Has Completed**

### ✅ **Google Analytics 4 (GA4)**
- ✅ GA4 property created and configured
- ✅ Ana will manage all GA4 instrumentation from her end
- ✅ No frontend action needed for GA4

### ✅ **Google Tag Manager (GTM)**
- ✅ GTM container created and configured
- ✅ GTM container ID available
- ✅ Ana will manage GTM configuration from her end

---

## 🔧 **Frontend Integration Required**

### **1. Environment Variables**

Ana needs to provide the GTM container ID. Create a `.env.local` file with:

```bash
# Google Tag Manager Configuration
# Ana will provide the actual GTM ID from her GTM setup
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Enable GTM in development (set to 'true' to enable)
NEXT_PUBLIC_ENABLE_GTM=false
```

**Ana's Task**: Replace `GTM-XXXXXXX` with the actual GTM container ID.

### **2. GTM Integration Status**

The frontend team has already implemented:

- ✅ **GTMProvider Component**: Complete GTM integration component
- ✅ **Data Layer Support**: Full data layer implementation
- ✅ **Event Tracking**: Comprehensive event tracking system
- ✅ **Performance Monitoring**: Core Web Vitals tracking
- ✅ **Error Tracking**: JavaScript error tracking
- ✅ **Scroll Tracking**: Scroll depth tracking
- ✅ **Layout Integration**: GTM provider integrated into layout

---

## 🎯 **Available Tracking Functions**

### **Page Views**
```typescript
import { useGTM } from '@/components/GTMProvider'

const { trackPageView } = useGTM()
trackPageView('/current-page', 'Page Title')
```

### **Custom Events**
```typescript
import { useGTM } from '@/components/GTMProvider'

const { trackEvent } = useGTM()
trackEvent('button_click', {
  button_name: 'signup',
  page_path: '/home'
})
```

### **User Interactions**
```typescript
import { useGTM } from '@/components/GTMProvider'

const { trackUserInteraction } = useGTM()
trackUserInteraction('click', 'button', 'signup_button', 1)
```

### **Form Submissions**
```typescript
import { useGTM } from '@/components/GTMProvider'

const { trackFormSubmission } = useGTM()
trackFormSubmission('newsletter_signup', 'newsletter-form')
```

### **Search Events**
```typescript
import { useGTM } from '@/components/GTMProvider'

const { trackSearch } = useGTM()
trackSearch('react tutorial', 25)
```

### **Content Engagement**
```typescript
import { useGTM } from '@/components/GTMProvider'

const { trackContentEngagement } = useGTM()
trackContentEngagement('article', 'react-guide-2024', 'read')
```

### **Utility Functions (Direct Access)**
```typescript
import { gtmTrack } from '@/components/GTMProvider'

// Direct data layer push
gtmTrack.event('custom_event', {
  custom_parameter: 'value'
})

// Page view tracking
gtmTrack.pageView('/current-page', 'Page Title')
```

---

## 📊 **Automatic Tracking**

The GTM provider automatically tracks:

### **Performance Metrics**
- ✅ **Core Web Vitals**: LCP, FID, FCP, CLS, TTFB
- ✅ **Page Load Time**: Total page load time
- ✅ **Performance Events**: Sent to GTM data layer

### **User Behavior**
- ✅ **Page Views**: Automatic on route changes
- ✅ **Scroll Depth**: Tracks scroll percentage
- ✅ **Time on Page**: Tracks session duration
- ✅ **Error Tracking**: JavaScript errors and unhandled rejections

### **Event Structure**
All events are pushed to the data layer with consistent structure:

```javascript
{
  event: 'event_name',
  page_path: '/current-path',
  timestamp: Date.now(),
  // ... additional parameters
}
```

---

## 🧪 **Testing GTM Integration**

### **1. Development Testing**
```bash
# Enable GTM in development
NEXT_PUBLIC_ENABLE_GTM=true
```

### **2. Browser Console Testing**
```javascript
// Check if data layer exists
console.log(window.dataLayer)

// Manually push test event
window.dataLayer.push({
  event: 'test_event',
  test_parameter: 'test_value'
})
```

### **3. GTM Preview Mode**
1. Open GTM in preview mode
2. Navigate to the website
3. Check if events are firing
4. Verify data layer variables

### **4. GA4 Real-time Reports**
1. Open GA4 real-time reports
2. Navigate to the website
3. Check if page views and events appear

---

## 🔍 **Event Categories**

### **Page Events**
- `page_view` - Page view tracking
- `page_load` - Page load performance

### **User Interaction Events**
- `user_interaction` - Button clicks, form interactions
- `form_submit` - Form submissions
- `search` - Search functionality

### **Content Events**
- `content_engagement` - Article reads, video views
- `scroll_depth` - Scroll tracking

### **Performance Events**
- `web_vitals` - Core Web Vitals metrics
- `error` - JavaScript errors

### **Custom Events**
- Any custom event name with parameters

---

## 📈 **Data Layer Structure**

### **Standard Event Structure**
```javascript
{
  event: 'event_name',
  page_path: '/current-path',
  page_title: 'Page Title',
  timestamp: Date.now(),
  user_agent: navigator.userAgent,
  // ... custom parameters
}
```

### **Page View Event**
```javascript
{
  event: 'page_view',
  page_title: 'Home Page',
  page_location: 'https://learner10x.com/',
  page_path: '/'
}
```

### **User Interaction Event**
```javascript
{
  event: 'user_interaction',
  action: 'click',
  category: 'button',
  label: 'signup_button',
  value: 1
}
```

### **Performance Event**
```javascript
{
  event: 'web_vitals',
  metric_name: 'lcp',
  metric_value: 1200,
  page_path: '/'
}
```

---

## 🚀 **Next Steps**

### **Ana's Tasks**
1. ✅ **Provide GTM ID**: Share the actual GTM container ID
2. ✅ **Configure GTM**: Set up triggers and tags in GTM
3. ✅ **Test Integration**: Verify events are firing correctly
4. ✅ **Monitor Analytics**: Check GA4 for data flow

### **Frontend Team Tasks**
1. ✅ **GTM Integration**: Complete (GTMProvider implemented)
2. ✅ **Data Layer**: Complete (Full data layer support)
3. 📋 **Environment Setup**: Add GTM ID to environment variables
4. 📋 **Testing**: Test GTM integration in development
5. 📋 **Event Implementation**: Add tracking to specific components

### **Testing Checklist**
- [ ] GTM container loads correctly
- [ ] Page views are tracked
- [ ] Custom events fire properly
- [ ] Performance metrics are captured
- [ ] Error tracking works
- [ ] Scroll tracking functions
- [ ] Data appears in GA4 real-time reports

---

## 📞 **Support**

### **GTM Issues**
- Check browser console for errors
- Verify GTM ID is correct
- Test in GTM preview mode
- Check network tab for GTM requests

### **Analytics Issues**
- Verify events in GTM debug mode
- Check GA4 real-time reports
- Confirm data layer variables
- Test with GTM preview

---

## 🎯 **Success Criteria**

### **GTM Integration**
- ✅ GTM container loads without errors
- ✅ Data layer is accessible
- ✅ Events push to data layer correctly
- ✅ GTM preview mode shows events

### **Analytics Flow**
- ✅ Events appear in GTM
- ✅ Data flows to GA4
- ✅ Real-time reports show activity
- ✅ Custom events are tracked

### **Performance**
- ✅ GTM doesn't impact page load
- ✅ No console errors
- ✅ Smooth user experience
- ✅ Analytics don't block rendering

---

**Status**: ✅ **GTM INTEGRATION COMPLETE** - Frontend team has implemented full GTM integration. Ana needs to provide GTM ID and test the integration. 