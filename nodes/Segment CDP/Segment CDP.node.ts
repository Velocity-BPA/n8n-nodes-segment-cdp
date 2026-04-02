/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-segmentcdp/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class SegmentCDP implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Segment CDP',
    name: 'segmentcdp',
    icon: 'file:segmentcdp.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Segment CDP API',
    defaults: {
      name: 'Segment CDP',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'segmentcdpApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Workspace',
            value: 'workspace',
          },
          {
            name: 'Source',
            value: 'source',
          },
          {
            name: 'Destination',
            value: 'destination',
          },
          {
            name: 'Tracking Plan',
            value: 'trackingPlan',
          },
          {
            name: 'User',
            value: 'user',
          },
          {
            name: 'Deletion and Suppression',
            value: 'deletionAndSuppression',
          },
          {
            name: 'Event',
            value: 'event',
          }
        ],
        default: 'workspace',
      },
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['workspace'] } },
  options: [
    { name: 'Get All Workspaces', value: 'getWorkspaces', description: 'List all workspaces', action: 'Get all workspaces' },
    { name: 'Get Workspace', value: 'getWorkspace', description: 'Get workspace by ID', action: 'Get workspace' },
    { name: 'Update Workspace', value: 'updateWorkspace', description: 'Update workspace settings', action: 'Update workspace' }
  ],
  default: 'getWorkspaces',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['source'],
    },
  },
  options: [
    {
      name: 'Get Sources',
      value: 'getSources',
      description: 'List all sources in workspace',
      action: 'Get sources',
    },
    {
      name: 'Create Source',
      value: 'createSource',
      description: 'Create a new source',
      action: 'Create source',
    },
    {
      name: 'Get Source',
      value: 'getSource',
      description: 'Get source by ID',
      action: 'Get source',
    },
    {
      name: 'Update Source',
      value: 'updateSource',
      description: 'Update source configuration',
      action: 'Update source',
    },
    {
      name: 'Delete Source',
      value: 'deleteSource',
      description: 'Delete a source',
      action: 'Delete source',
    },
  ],
  default: 'getSources',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['destination'] } },
  options: [
    { name: 'Get Destinations', value: 'getDestinations', description: 'List all destinations', action: 'Get destinations' },
    { name: 'Create Destination', value: 'createDestination', description: 'Create a new destination', action: 'Create destination' },
    { name: 'Get Destination', value: 'getDestination', description: 'Get destination by ID', action: 'Get destination' },
    { name: 'Update Destination', value: 'updateDestination', description: 'Update destination settings', action: 'Update destination' },
    { name: 'Delete Destination', value: 'deleteDestination', description: 'Delete a destination', action: 'Delete destination' },
  ],
  default: 'getDestinations',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['trackingPlan'],
		},
	},
	options: [
		{
			name: 'Get All Tracking Plans',
			value: 'getTrackingPlans',
			description: 'List all tracking plans',
			action: 'Get all tracking plans',
		},
		{
			name: 'Create Tracking Plan',
			value: 'createTrackingPlan',
			description: 'Create a new tracking plan',
			action: 'Create tracking plan',
		},
		{
			name: 'Get Tracking Plan',
			value: 'getTrackingPlan',
			description: 'Get tracking plan by ID',
			action: 'Get tracking plan',
		},
		{
			name: 'Update Tracking Plan',
			value: 'updateTrackingPlan',
			description: 'Update tracking plan',
			action: 'Update tracking plan',
		},
		{
			name: 'Delete Tracking Plan',
			value: 'deleteTrackingPlan',
			description: 'Delete tracking plan',
			action: 'Delete tracking plan',
		},
	],
	default: 'getTrackingPlans',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['user'] } },
  options: [
    { name: 'Get Users', value: 'getUsers', description: 'List workspace users', action: 'Get users' },
    { name: 'Create User', value: 'createUser', description: 'Invite user to workspace', action: 'Create user' },
    { name: 'Get User', value: 'getUser', description: 'Get user by ID', action: 'Get user' },
    { name: 'Update User', value: 'updateUser', description: 'Update user role or permissions', action: 'Update user' },
    { name: 'Delete User', value: 'deleteUser', description: 'Remove user from workspace', action: 'Delete user' }
  ],
  default: 'getUsers',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['deletionAndSuppression'] } },
	options: [
		{
			name: 'Get Deletion Requests',
			value: 'getDeletionRequests',
			description: 'List deletion requests',
			action: 'Get deletion requests',
		},
		{
			name: 'Create Deletion Request',
			value: 'createDeletionRequest',
			description: 'Create user deletion request',
			action: 'Create deletion request',
		},
		{
			name: 'Get Deletion Request',
			value: 'getDeletionRequest',
			description: 'Get deletion request status',
			action: 'Get deletion request',
		},
		{
			name: 'Get Suppression Requests',
			value: 'getSuppressionRequests',
			description: 'List suppression requests',
			action: 'Get suppression requests',
		},
		{
			name: 'Create Suppression Request',
			value: 'createSuppressionRequest',
			description: 'Create user suppression request',
			action: 'Create suppression request',
		},
		{
			name: 'Get Suppression Request',
			value: 'getSuppressionRequest',
			description: 'Get suppression request status',
			action: 'Get suppression request',
		},
	],
	default: 'getDeletionRequests',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['event'] } },
  options: [
    { name: 'Track Event', value: 'trackEvent', description: 'Send tracking event', action: 'Track event' },
    { name: 'Identify User', value: 'identifyUser', description: 'Identify user with traits', action: 'Identify user' },
    { name: 'Track Page', value: 'trackPage', description: 'Track page view', action: 'Track page' },
    { name: 'Track Screen', value: 'trackScreen', description: 'Track mobile screen view', action: 'Track screen' },
    { name: 'Track Group', value: 'trackGroup', description: 'Associate user with group', action: 'Track group' },
    { name: 'Alias User', value: 'aliasUser', description: 'Alias user identities', action: 'Alias user' },
  ],
  default: 'trackEvent',
},
{
  displayName: 'Workspace ID',
  name: 'workspaceId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['workspace'], operation: ['getWorkspace', 'updateWorkspace'] } },
  default: '',
  description: 'The ID of the workspace',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: false,
  displayOptions: { show: { resource: ['workspace'], operation: ['updateWorkspace'] } },
  default: '',
  description: 'The name of the workspace',
},
{
  displayName: 'Display Name',
  name: 'displayName',
  type: 'string',
  required: false,
  displayOptions: { show: { resource: ['workspace'], operation: ['updateWorkspace'] } },
  default: '',
  description: 'The display name of the workspace',
},
{
  displayName: 'Workspace ID',
  name: 'workspaceId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['source'],
      operation: ['getSources'],
    },
  },
  default: '',
  description: 'The ID of the workspace to list sources from',
},
{
  displayName: 'Workspace ID',
  name: 'workspaceId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['source'],
      operation: ['createSource'],
    },
  },
  default: '',
  description: 'The ID of the workspace to create source in',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['source'],
      operation: ['createSource'],
    },
  },
  default: '',
  description: 'The name of the source',
},
{
  displayName: 'Catalog ID',
  name: 'catalogId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['source'],
      operation: ['createSource'],
    },
  },
  default: '',
  description: 'The catalog ID for the source',
},
{
  displayName: 'Metadata ID',
  name: 'metadataId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['source'],
      operation: ['createSource'],
    },
  },
  default: '',
  description: 'The metadata ID for the source',
},
{
  displayName: 'Source ID',
  name: 'sourceId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['source'],
      operation: ['getSource'],
    },
  },
  default: '',
  description: 'The ID of the source to retrieve',
},
{
  displayName: 'Source ID',
  name: 'sourceId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['source'],
      operation: ['updateSource'],
    },
  },
  default: '',
  description: 'The ID of the source to update',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['source'],
      operation: ['updateSource'],
    },
  },
  default: '',
  description: 'The new name of the source',
},
{
  displayName: 'Enabled',
  name: 'enabled',
  type: 'boolean',
  required: false,
  displayOptions: {
    show: {
      resource: ['source'],
      operation: ['updateSource'],
    },
  },
  default: true,
  description: 'Whether the source is enabled',
},
{
  displayName: 'Source ID',
  name: 'sourceId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['source'],
      operation: ['deleteSource'],
    },
  },
  default: '',
  description: 'The ID of the source to delete',
},
{
  displayName: 'Workspace ID',
  name: 'workspaceId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['destination'], operation: ['getDestinations', 'createDestination'] } },
  default: '',
  description: 'The workspace ID',
},
{
  displayName: 'Source ID',
  name: 'sourceId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['destination'], operation: ['createDestination'] } },
  default: '',
  description: 'The source ID for the destination',
},
{
  displayName: 'Catalog ID',
  name: 'catalogId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['destination'], operation: ['createDestination'] } },
  default: '',
  description: 'The catalog ID for the destination',
},
{
  displayName: 'Destination ID',
  name: 'destinationId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['destination'], operation: ['getDestination', 'updateDestination', 'deleteDestination'] } },
  default: '',
  description: 'The destination ID',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['destination'], operation: ['createDestination'] } },
  default: '',
  description: 'Name of the destination',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: false,
  displayOptions: { show: { resource: ['destination'], operation: ['updateDestination'] } },
  default: '',
  description: 'Name of the destination',
},
{
  displayName: 'Settings',
  name: 'settings',
  type: 'fixedCollection',
  typeOptions: {
    multipleValues: true,
  },
  displayOptions: { show: { resource: ['destination'], operation: ['createDestination', 'updateDestination'] } },
  default: {},
  options: [
    {
      name: 'setting',
      displayName: 'Setting',
      values: [
        {
          displayName: 'Key',
          name: 'key',
          type: 'string',
          default: '',
          description: 'Setting key',
        },
        {
          displayName: 'Value',
          name: 'value',
          type: 'string',
          default: '',
          description: 'Setting value',
        },
      ],
    },
  ],
  description: 'Destination settings as key-value pairs',
},
{
  displayName: 'Enabled',
  name: 'enabled',
  type: 'boolean',
  displayOptions: { show: { resource: ['destination'], operation: ['updateDestination'] } },
  default: true,
  description: 'Whether the destination is enabled',
},
{
	displayName: 'Workspace ID',
	name: 'workspaceId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['trackingPlan'],
			operation: ['getTrackingPlans', 'createTrackingPlan'],
		},
	},
	default: '',
	description: 'The workspace ID to list tracking plans from',
},
{
	displayName: 'Tracking Plan ID',
	name: 'trackingPlanId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['trackingPlan'],
			operation: ['getTrackingPlan', 'updateTrackingPlan', 'deleteTrackingPlan'],
		},
	},
	default: '',
	description: 'The ID of the tracking plan',
},
{
	displayName: 'Name',
	name: 'name',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['trackingPlan'],
			operation: ['createTrackingPlan', 'updateTrackingPlan'],
		},
	},
	default: '',
	description: 'The name of the tracking plan',
},
{
	displayName: 'Description',
	name: 'description',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['trackingPlan'],
			operation: ['createTrackingPlan', 'updateTrackingPlan'],
		},
	},
	default: '',
	description: 'The description of the tracking plan',
},
{
	displayName: 'Type',
	name: 'type',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['trackingPlan'],
			operation: ['createTrackingPlan'],
		},
	},
	options: [
		{
			name: 'Live',
			value: 'LIVE',
		},
		{
			name: 'Property Template',
			value: 'PROPERTY_TEMPLATE',
		},
	],
	default: 'LIVE',
	description: 'The type of the tracking plan',
},
{
  displayName: 'Workspace ID',
  name: 'workspaceId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['user'],
      operation: ['getUsers', 'createUser']
    }
  },
  default: '',
  description: 'The ID of the workspace'
},
{
  displayName: 'Email',
  name: 'email',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['user'],
      operation: ['createUser']
    }
  },
  default: '',
  description: 'Email address of the user to invite'
},
{
  displayName: 'Role',
  name: 'role',
  type: 'options',
  required: true,
  displayOptions: {
    show: {
      resource: ['user'],
      operation: ['createUser', 'updateUser']
    }
  },
  options: [
    { name: 'Admin', value: 'admin' },
    { name: 'Member', value: 'member' },
    { name: 'Read Only', value: 'read_only' }
  ],
  default: 'member',
  description: 'Role to assign to the user'
},
{
  displayName: 'User ID',
  name: 'userId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['user'],
      operation: ['getUser', 'updateUser', 'deleteUser']
    }
  },
  default: '',
  description: 'The ID of the user'
},
{
	displayName: 'Workspace ID',
	name: 'workspaceId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['deletionAndSuppression'],
			operation: ['getDeletionRequests', 'createDeletionRequest', 'getSuppressionRequests', 'createSuppressionRequest'],
		},
	},
	default: '',
	description: 'The workspace ID',
},
{
	displayName: 'User ID',
	name: 'userId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['deletionAndSuppression'],
			operation: ['createDeletionRequest', 'createSuppressionRequest'],
		},
	},
	default: '',
	description: 'The user ID to delete or suppress',
},
{
	displayName: 'Regulation',
	name: 'regulation',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['deletionAndSuppression'],
			operation: ['createDeletionRequest', 'createSuppressionRequest'],
		},
	},
	options: [
		{
			name: 'GDPR',
			value: 'gdpr',
		},
		{
			name: 'CCPA',
			value: 'ccpa',
		},
	],
	default: 'gdpr',
	description: 'The regulation type',
},
{
	displayName: 'Request ID',
	name: 'requestId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['deletionAndSuppression'],
			operation: ['getDeletionRequest', 'getSuppressionRequest'],
		},
	},
	default: '',
	description: 'The request ID',
},
{
  displayName: 'User ID',
  name: 'userId',
  type: 'string',
  required: true,
  default: '',
  description: 'Unique identifier for the user',
  displayOptions: { show: { resource: ['event'], operation: ['trackEvent', 'identifyUser', 'trackPage', 'trackScreen', 'trackGroup', 'aliasUser'] } },
},
{
  displayName: 'Event',
  name: 'event',
  type: 'string',
  required: true,
  default: '',
  description: 'Name of the event to track',
  displayOptions: { show: { resource: ['event'], operation: ['trackEvent'] } },
},
{
  displayName: 'Properties',
  name: 'properties',
  type: 'json',
  default: '{}',
  description: 'Event properties as JSON object',
  displayOptions: { show: { resource: ['event'], operation: ['trackEvent', 'trackPage', 'trackScreen'] } },
},
{
  displayName: 'Traits',
  name: 'traits',
  type: 'json',
  default: '{}',
  description: 'User traits as JSON object',
  displayOptions: { show: { resource: ['event'], operation: ['identifyUser', 'trackGroup'] } },
},
{
  displayName: 'Context',
  name: 'context',
  type: 'json',
  default: '{}',
  description: 'Additional context information as JSON object',
  displayOptions: { show: { resource: ['event'], operation: ['trackEvent', 'identifyUser', 'trackPage', 'trackScreen', 'trackGroup', 'aliasUser'] } },
},
{
  displayName: 'Page Name',
  name: 'name',
  type: 'string',
  required: false,
  default: '',
  description: 'Name of the page',
  displayOptions: { show: { resource: ['event'], operation: ['trackPage'] } },
},
{
  displayName: 'Screen Name',
  name: 'name',
  type: 'string',
  required: false,
  default: '',
  description: 'Name of the screen',
  displayOptions: { show: { resource: ['event'], operation: ['trackScreen'] } },
},
{
  displayName: 'Group ID',
  name: 'groupId',
  type: 'string',
  required: true,
  default: '',
  description: 'Unique identifier for the group',
  displayOptions: { show: { resource: ['event'], operation: ['trackGroup'] } },
},
{
  displayName: 'Previous ID',
  name: 'previousId',
  type: 'string',
  required: true,
  default: '',
  description: 'Previous user identifier to alias',
  displayOptions: { show: { resource: ['event'], operation: ['aliasUser'] } },
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'workspace':
        return [await executeWorkspaceOperations.call(this, items)];
      case 'source':
        return [await executeSourceOperations.call(this, items)];
      case 'destination':
        return [await executeDestinationOperations.call(this, items)];
      case 'trackingPlan':
        return [await executeTrackingPlanOperations.call(this, items)];
      case 'user':
        return [await executeUserOperations.call(this, items)];
      case 'deletionAndSuppression':
        return [await executeDeletionandSuppressionOperations.call(this, items)];
      case 'event':
        return [await executeEventOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeWorkspaceOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('segmentcdpApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getWorkspaces': {
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/workspaces`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getWorkspace': {
          const workspaceId = this.getNodeParameter('workspaceId', i) as string;
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/workspaces/${workspaceId}`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateWorkspace': {
          const workspaceId = this.getNodeParameter('workspaceId', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const displayName = this.getNodeParameter('displayName', i) as string;

          const body: any = {};
          if (name) body.name = name;
          if (displayName) body.displayName = displayName;

          const options: any = {
            method: 'PATCH',
            url: `${credentials.baseUrl}/workspaces/${workspaceId}`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeSourceOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('segmentcdpApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getSources': {
          const workspaceId = this.getNodeParameter('workspaceId', i) as string;
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/sources`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json',
            },
            qs: {
              workspaceId,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'createSource': {
          const workspaceId = this.getNodeParameter('workspaceId', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const catalogId = this.getNodeParameter('catalogId', i) as string;
          const metadataId = this.getNodeParameter('metadataId', i) as string;
          
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/sources`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json',
            },
            body: {
              workspaceId,
              name,
              catalogId,
              metadataId,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getSource': {
          const sourceId = this.getNodeParameter('sourceId', i) as string;
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/sources/${sourceId}`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateSource': {
          const sourceId = this.getNodeParameter('sourceId', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const enabled = this.getNodeParameter('enabled', i) as boolean;
          
          const body: any = {};
          if (name) body.name = name;
          if (enabled !== undefined) body.enabled = enabled;
          
          const options: any = {
            method: 'PATCH',
            url: `${credentials.baseUrl}/sources/${sourceId}`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'deleteSource': {
          const sourceId = this.getNodeParameter('sourceId', i) as string;
          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/sources/${sourceId}`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeDestinationOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('segmentcdpApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getDestinations': {
          const workspaceId = this.getNodeParameter('workspaceId', i) as string;
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/destinations`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json',
            },
            qs: {
              'pagination.filter': `{"workspace.id":"${workspaceId}"}`,
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'createDestination': {
          const workspaceId = this.getNodeParameter('workspaceId', i) as string;
          const sourceId = this.getNodeParameter('sourceId', i) as string;
          const catalogId = this.getNodeParameter('catalogId', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const settingsParam = this.getNodeParameter('settings.setting', i, []) as any[];
          
          const settings: any = {};
          settingsParam.forEach((setting: any) => {
            if (setting.key && setting.value) {
              settings[setting.key] = setting.value;
            }
          });

          const body = {
            name,
            enabled: true,
            settings,
            sourceId,
            catalogId,
          };

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/destinations`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getDestination': {
          const destinationId = this.getNodeParameter('destinationId', i) as string;
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/destinations/${destinationId}`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateDestination': {
          const destinationId = this.getNodeParameter('destinationId', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const enabled = this.getNodeParameter('enabled', i) as boolean;
          const settingsParam = this.getNodeParameter('settings.setting', i, []) as any[];
          
          const settings: any = {};
          settingsParam.forEach((setting: any) => {
            if (setting.key && setting.value) {
              settings[setting.key] = setting.value;
            }
          });

          const body: any = {
            enabled,
          };

          if (name) {
            body.name = name;
          }

          if (Object.keys(settings).length > 0) {
            body.settings = settings;
          }

          const options: any = {
            method: 'PATCH',
            url: `${credentials.baseUrl}/destinations/${destinationId}`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'deleteDestination': {
          const destinationId = this.getNodeParameter('destinationId', i) as string;
          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/destinations/${destinationId}`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeTrackingPlanOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('segmentcdpApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getTrackingPlans': {
					const workspaceId = this.getNodeParameter('workspaceId', i) as string;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/tracking-plans?workspaceId=${workspaceId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createTrackingPlan': {
					const workspaceId = this.getNodeParameter('workspaceId', i) as string;
					const name = this.getNodeParameter('name', i) as string;
					const description = this.getNodeParameter('description', i) as string;
					const type = this.getNodeParameter('type', i) as string;

					const body: any = {
						workspaceId,
						name,
						type,
					};

					if (description) {
						body.description = description;
					}

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/tracking-plans`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getTrackingPlan': {
					const trackingPlanId = this.getNodeParameter('trackingPlanId', i) as string;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/tracking-plans/${trackingPlanId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateTrackingPlan': {
					const trackingPlanId = this.getNodeParameter('trackingPlanId', i) as string;
					const name = this.getNodeParameter('name', i) as string;
					const description = this.getNodeParameter('description', i) as string;

					const body: any = {
						name,
					};

					if (description) {
						body.description = description;
					}

					const options: any = {
						method: 'PATCH',
						url: `${credentials.baseUrl}/tracking-plans/${trackingPlanId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteTrackingPlan': {
					const trackingPlanId = this.getNodeParameter('trackingPlanId', i) as string;
					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/tracking-plans/${trackingPlanId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeUserOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('segmentcdpApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getUsers': {
          const workspaceId = this.getNodeParameter('workspaceId', i) as string;
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/users?workspaceId=${workspaceId}`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json'
            },
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'createUser': {
          const workspaceId = this.getNodeParameter('workspaceId', i) as string;
          const email = this.getNodeParameter('email', i) as string;
          const role = this.getNodeParameter('role', i) as string;
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/users`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json'
            },
            body: {
              workspaceId,
              email,
              role
            },
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'getUser': {
          const userId = this.getNodeParameter('userId', i) as string;
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/users/${userId}`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json'
            },
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'updateUser': {
          const userId = this.getNodeParameter('userId', i) as string;
          const role = this.getNodeParameter('role', i) as string;
          const options: any = {
            method: 'PATCH',
            url: `${credentials.baseUrl}/users/${userId}`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json'
            },
            body: {
              role
            },
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        case 'deleteUser': {
          const userId = this.getNodeParameter('userId', i) as string;
          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/users/${userId}`,
            headers: {
              'Authorization': `Bearer ${credentials.bearerToken}`,
              'Content-Type': 'application/json'
            },
            json: true
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeDeletionAndSuppressionOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('segmentcdpApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getDeletionRequests': {
					const workspaceId = this.getNodeParameter('workspaceId', i) as string;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/delete-users`,
						headers: {
							'Authorization': `Bearer ${credentials.bearerToken}`,
							'Content-Type': 'application/json',
						},
						qs: {
							workspaceId,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createDeletionRequest': {
					const workspaceId = this.getNodeParameter('workspaceId', i) as string;
					const userId = this.getNodeParameter('userId', i) as string;
					const regulation = this.getNodeParameter('regulation', i) as string;
					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/delete-users`,
						headers: {
							'Authorization': `Bearer ${credentials.bearerToken}`,
							'Content-Type': 'application/json',
						},
						body: {
							workspaceId,
							userId,
							regulation,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getDeletionRequest': {
					const requestId = this.getNodeParameter('requestId', i) as string;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/delete-users/${requestId}`,
						headers: {
							'Authorization': `Bearer ${credentials.bearerToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getSuppressionRequests': {
					const workspaceId = this.getNodeParameter('workspaceId', i) as string;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/suppress-users`,
						headers: {
							'Authorization': `Bearer ${credentials.bearerToken}`,
							'Content-Type': 'application/json',
						},
						qs: {
							workspaceId,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createSuppressionRequest': {
					const workspaceId = this.getNodeParameter('workspaceId', i) as string;
					const userId = this.getNodeParameter('userId', i) as string;
					const regulation = this.getNodeParameter('regulation', i) as string;
					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/suppress-users`,
						headers: {
							'Authorization': `Bearer ${credentials.bearerToken}`,
							'Content-Type': 'application/json',
						},
						body: {
							workspaceId,
							userId,
							regulation,
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getSuppressionRequest': {
					const requestId = this.getNodeParameter('requestId', i) as string;
					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/suppress-users/${requestId}`,
						headers: {
							'Authorization': `Bearer ${credentials.bearerToken}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};
					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({ json: result, pairedItem: { item: i } });

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeEventOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('segmentcdpApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const baseOptions: any = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${credentials.apiKey}`,
          'Content-Type': 'application/json',
        },
        json: true,
      };

      switch (operation) {
        case 'trackEvent': {
          const userId = this.getNodeParameter('userId', i) as string;
          const event = this.getNodeParameter('event', i) as string;
          const properties = this.getNodeParameter('properties', i, '{}') as string;
          const context = this.getNodeParameter('context', i, '{}') as string;

          const options = {
            ...baseOptions,
            url: `${credentials.baseUrl}/track`,
            body: {
              userId,
              event,
              properties: typeof properties === 'string' ? JSON.parse(properties) : properties,
              context: typeof context === 'string' ? JSON.parse(context) : context,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'identifyUser': {
          const userId = this.getNodeParameter('userId', i) as string;
          const traits = this.getNodeParameter('traits', i, '{}') as string;
          const context = this.getNodeParameter('context', i, '{}') as string;

          const options = {
            ...baseOptions,
            url: `${credentials.baseUrl}/identify`,
            body: {
              userId,
              traits: typeof traits === 'string' ? JSON.parse(traits) : traits,
              context: typeof context === 'string' ? JSON.parse(context) : context,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'trackPage': {
          const userId = this.getNodeParameter('userId', i) as string;
          const name = this.getNodeParameter('name', i, '') as string;
          const properties = this.getNodeParameter('properties', i, '{}') as string;
          const context = this.getNodeParameter('context', i, '{}') as string;

          const options = {
            ...baseOptions,
            url: `${credentials.baseUrl}/page`,
            body: {
              userId,
              name,
              properties: typeof properties === 'string' ? JSON.parse(properties) : properties,
              context: typeof context === 'string' ? JSON.parse(context) : context,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'trackScreen': {
          const userId = this.getNodeParameter('userId', i) as string;
          const name = this.getNodeParameter('name', i, '') as string;
          const properties = this.getNodeParameter('properties', i, '{}') as string;
          const context = this.getNodeParameter('context', i, '{}') as string;

          const options = {
            ...baseOptions,
            url: `${credentials.baseUrl}/screen`,
            body: {
              userId,
              name,
              properties: typeof properties === 'string' ? JSON.parse(properties) : properties,
              context: typeof context === 'string' ? JSON.parse(context) : context,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'trackGroup': {
          const userId = this.getNodeParameter('userId', i) as string;
          const groupId = this.getNodeParameter('groupId', i) as string;
          const traits = this.getNodeParameter('traits', i, '{}') as string;
          const context = this.getNodeParameter('context', i, '{}') as string;

          const options = {
            ...baseOptions,
            url: `${credentials.baseUrl}/group`,
            body: {
              userId,
              groupId,
              traits: typeof traits === 'string' ? JSON.parse(traits) : traits,
              context: typeof context === 'string' ? JSON.parse(context) : context,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'aliasUser': {
          const userId = this.getNodeParameter('userId', i) as string;
          const previousId = this.getNodeParameter('previousId', i) as string;
          const context = this.getNodeParameter('context', i, '{}') as string;

          const options = {
            ...baseOptions,
            url: `${credentials.baseUrl}/alias`,
            body: {
              userId,
              previousId,
              context: typeof context === 'string' ? JSON.parse(context) : context,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}
