# n8n-nodes-segment-cdp

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This n8n community node provides comprehensive integration with Segment CDP (Customer Data Platform), offering 7 core resources for complete customer data management. Automate workspace configuration, source and destination management, tracking plan implementation, user data operations, privacy compliance through deletion and suppression controls, and event tracking workflows.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Segment CDP](https://img.shields.io/badge/Segment-CDP-green)
![Customer Data Platform](https://img.shields.io/badge/Customer%20Data-Platform-orange)
![Privacy Compliance](https://img.shields.io/badge/Privacy-Compliance-purple)

## Features

- **Workspace Management** - Create, configure, and manage Segment workspaces with full access control
- **Source Integration** - Connect and manage data sources including web, mobile, server, and cloud apps
- **Destination Orchestration** - Configure and control data flow to marketing, analytics, and storage destinations
- **Tracking Plan Enforcement** - Implement and validate event schemas for consistent data governance
- **User Data Operations** - Comprehensive user profile management and segmentation capabilities
- **Privacy Compliance** - Automated deletion and suppression workflows for GDPR, CCPA compliance
- **Event Tracking** - Real-time event collection, validation, and routing across your data stack
- **API Key Authentication** - Secure access using Segment API tokens with workspace-level permissions

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-segment-cdp`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-segment-cdp
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-segment-cdp.git
cd n8n-nodes-segment-cdp
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-segment-cdp
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Token | Segment Public API token with workspace permissions | ✅ |
| Workspace ID | Target workspace identifier for operations | ✅ |
| Environment | API environment (production/development) | ✅ |

## Resources & Operations

### 1. Workspace

| Operation | Description |
|-----------|-------------|
| Get | Retrieve workspace details and configuration |
| Update | Modify workspace settings and permissions |
| List Users | Get all users with workspace access |
| Invite User | Send workspace invitation to new users |
| Remove User | Revoke user access from workspace |

### 2. Source

| Operation | Description |
|-----------|-------------|
| Create | Create new data source (web, mobile, server, cloud) |
| Get | Retrieve source configuration and metadata |
| Update | Modify source settings and collection parameters |
| Delete | Remove source and stop data collection |
| List | Get all sources in workspace |
| Get Schema | Retrieve source event schema and tracking plan |

### 3. Destination

| Operation | Description |
|-----------|-------------|
| Create | Create new destination connection |
| Get | Retrieve destination configuration and status |
| Update | Modify destination settings and mappings |
| Delete | Remove destination and stop data flow |
| List | Get all destinations in workspace |
| Toggle | Enable or disable destination data flow |

### 4. Tracking Plan

| Operation | Description |
|-----------|-------------|
| Create | Create new tracking plan with event schema |
| Get | Retrieve tracking plan details and rules |
| Update | Modify tracking plan schema and validation rules |
| Delete | Remove tracking plan and validation |
| List | Get all tracking plans in workspace |
| Validate | Validate events against tracking plan schema |

### 5. User

| Operation | Description |
|-----------|-------------|
| Get Profile | Retrieve user profile and computed traits |
| Update Traits | Modify user traits and attributes |
| Delete | Remove user profile and associated data |
| List Segments | Get user segment memberships |
| Track Event | Send user event to Segment |
| Get Events | Retrieve user event history |

### 6. Deletion and Suppression

| Operation | Description |
|-----------|-------------|
| Create Request | Submit user data deletion request |
| Get Request | Check deletion request status |
| List Requests | Get all deletion requests |
| Suppress User | Add user to suppression list |
| Unsuppress User | Remove user from suppression list |
| List Suppressed | Get all suppressed users |

### 7. Event

| Operation | Description |
|-----------|-------------|
| Track | Send track event with properties |
| Page | Send page view event |
| Screen | Send mobile screen view event |
| Identify | Send user identification event |
| Group | Send group membership event |
| Alias | Create user identity alias |

## Usage Examples

```javascript
// Track user signup event
{
  "userId": "user_12345",
  "event": "User Signed Up",
  "properties": {
    "plan": "premium",
    "source": "landing_page",
    "campaign": "summer_2024"
  },
  "context": {
    "ip": "192.168.1.1",
    "userAgent": "Mozilla/5.0..."
  }
}
```

```javascript
// Create marketing destination
{
  "name": "Facebook Conversions API",
  "sourceId": "js_abc123",
  "config": {
    "pixelId": "1234567890",
    "accessToken": "EAABwzLixnjy...",
    "testEvents": false
  },
  "enabled": true
}
```

```javascript
// Submit GDPR deletion request
{
  "userId": "user_12345",
  "regulation": "gdpr",
  "attributes": {
    "email": "user@example.com",
    "phone": "+1234567890"
  },
  "workspace": "workspace_abc123"
}
```

```javascript
// Update user traits
{
  "userId": "user_12345",
  "traits": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "plan": "enterprise",
    "lastLogin": "2024-01-15T10:30:00Z"
  }
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| 401 Unauthorized | Invalid API token or expired credentials | Verify API token and workspace permissions |
| 404 Not Found | Resource doesn't exist or insufficient permissions | Check resource ID and access level |
| 429 Rate Limited | Too many requests to Segment API | Implement exponential backoff and retry logic |
| 422 Unprocessable Entity | Invalid event schema or missing required fields | Validate event structure against tracking plan |
| 500 Internal Server Error | Segment service temporarily unavailable | Retry request after delay |
| Network Timeout | Request exceeded timeout limit | Check network connectivity and increase timeout |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-segment-cdp/issues)
- **Segment Documentation**: [Segment Public API](https://docs.segmentapis.com/)
- **Community**: [Segment Community](https://community.segment.com/)