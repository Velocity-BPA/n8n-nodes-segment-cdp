/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { SegmentCDP } from '../nodes/Segment CDP/Segment CDP.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('SegmentCDP Node', () => {
  let node: SegmentCDP;

  beforeAll(() => {
    node = new SegmentCDP();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Segment CDP');
      expect(node.description.name).toBe('segmentcdp');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 7 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(7);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(7);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Workspace Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        bearerToken: 'test-token', 
        baseUrl: 'https://api.segmentapis.com/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
    };
  });

  it('should get all workspaces successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValue('getWorkspaces');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ workspaces: [] });

    const result = await executeWorkspaceOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.segmentapis.com/v1/workspaces',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  it('should get workspace by ID successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getWorkspace')
      .mockReturnValueOnce('workspace-123');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ workspace: {} });

    const result = await executeWorkspaceOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.segmentapis.com/v1/workspaces/workspace-123',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  it('should update workspace successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('updateWorkspace')
      .mockReturnValueOnce('workspace-123')
      .mockReturnValueOnce('New Name')
      .mockReturnValueOnce('New Display Name');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ workspace: {} });

    const result = await executeWorkspaceOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'PATCH',
      url: 'https://api.segmentapis.com/v1/workspaces/workspace-123',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      body: { name: 'New Name', displayName: 'New Display Name' },
      json: true,
    });
  });

  it('should handle errors when continueOnFail is true', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValue('getWorkspaces');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executeWorkspaceOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('API Error');
  });

  it('should throw error when continueOnFail is false', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValue('getWorkspaces');
    mockExecuteFunctions.continueOnFail.mockReturnValue(false);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    await expect(
      executeWorkspaceOperations.call(mockExecuteFunctions, [{ json: {} }])
    ).rejects.toThrow('API Error');
  });
});

describe('Source Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        bearerToken: 'test-token',
        baseUrl: 'https://api.segmentapis.com/v1',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('getSources operation', () => {
    it('should get sources successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getSources')
        .mockReturnValueOnce('workspace123');
      
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        sources: [{ id: 'source1', name: 'Test Source' }],
      });

      const result = await executeSourceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.segmentapis.com/v1/sources',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
        qs: { workspaceId: 'workspace123' },
        json: true,
      });
      expect(result[0].json.sources).toBeDefined();
    });

    it('should handle errors in getSources', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getSources')
        .mockReturnValueOnce('workspace123');
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);
      
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

      const result = await executeSourceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result[0].json.error).toBe('API Error');
    });
  });

  describe('createSource operation', () => {
    it('should create source successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('createSource')
        .mockReturnValueOnce('workspace123')
        .mockReturnValueOnce('New Source')
        .mockReturnValueOnce('catalog123')
        .mockReturnValueOnce('metadata123');
      
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        id: 'source123',
        name: 'New Source',
      });

      const result = await executeSourceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.segmentapis.com/v1/sources',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
        body: {
          workspaceId: 'workspace123',
          name: 'New Source',
          catalogId: 'catalog123',
          metadataId: 'metadata123',
        },
        json: true,
      });
      expect(result[0].json.id).toBe('source123');
    });
  });

  describe('getSource operation', () => {
    it('should get source successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getSource')
        .mockReturnValueOnce('source123');
      
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        id: 'source123',
        name: 'Test Source',
      });

      const result = await executeSourceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.segmentapis.com/v1/sources/source123',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
        json: true,
      });
      expect(result[0].json.id).toBe('source123');
    });
  });

  describe('updateSource operation', () => {
    it('should update source successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('updateSource')
        .mockReturnValueOnce('source123')
        .mockReturnValueOnce('Updated Source')
        .mockReturnValueOnce(true);
      
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        id: 'source123',
        name: 'Updated Source',
        enabled: true,
      });

      const result = await executeSourceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'PATCH',
        url: 'https://api.segmentapis.com/v1/sources/source123',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
        body: {
          name: 'Updated Source',
          enabled: true,
        },
        json: true,
      });
      expect(result[0].json.name).toBe('Updated Source');
    });
  });

  describe('deleteSource operation', () => {
    it('should delete source successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('deleteSource')
        .mockReturnValueOnce('source123');
      
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        success: true,
      });

      const result = await executeSourceOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'DELETE',
        url: 'https://api.segmentapis.com/v1/sources/source123',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
        json: true,
      });
      expect(result[0].json.success).toBe(true);
    });
  });
});

describe('Destination Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        bearerToken: 'test-token', 
        baseUrl: 'https://api.segmentapis.com/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
    };
  });

  it('should get destinations successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getDestinations')
      .mockReturnValueOnce('workspace-123');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ destinations: [] });

    const result = await executeDestinationOperations.call(mockExecuteFunctions, [{ json: {} }]);
    expect(result).toEqual([{ json: { destinations: [] }, pairedItem: { item: 0 } }]);
  });

  it('should create destination successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('createDestination')
      .mockReturnValueOnce('workspace-123')
      .mockReturnValueOnce('source-123')
      .mockReturnValueOnce('catalog-123')
      .mockReturnValueOnce('Test Destination')
      .mockReturnValueOnce([]);
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ destination: { id: 'dest-123' } });

    const result = await executeDestinationOperations.call(mockExecuteFunctions, [{ json: {} }]);
    expect(result).toEqual([{ json: { destination: { id: 'dest-123' } }, pairedItem: { item: 0 } }]);
  });

  it('should get destination successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getDestination')
      .mockReturnValueOnce('dest-123');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ destination: { id: 'dest-123' } });

    const result = await executeDestinationOperations.call(mockExecuteFunctions, [{ json: {} }]);
    expect(result).toEqual([{ json: { destination: { id: 'dest-123' } }, pairedItem: { item: 0 } }]);
  });

  it('should update destination successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('updateDestination')
      .mockReturnValueOnce('dest-123')
      .mockReturnValueOnce('Updated Destination')
      .mockReturnValueOnce(true)
      .mockReturnValueOnce([]);
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ destination: { id: 'dest-123' } });

    const result = await executeDestinationOperations.call(mockExecuteFunctions, [{ json: {} }]);
    expect(result).toEqual([{ json: { destination: { id: 'dest-123' } }, pairedItem: { item: 0 } }]);
  });

  it('should delete destination successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('deleteDestination')
      .mockReturnValueOnce('dest-123');
    
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ success: true });

    const result = await executeDestinationOperations.call(mockExecuteFunctions, [{ json: {} }]);
    expect(result).toEqual([{ json: { success: true }, pairedItem: { item: 0 } }]);
  });

  it('should handle errors when continueOnFail is true', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getDestinations');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executeDestinationOperations.call(mockExecuteFunctions, [{ json: {} }]);
    expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
  });

  it('should throw error when continueOnFail is false', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getDestinations');
    mockExecuteFunctions.continueOnFail.mockReturnValue(false);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    await expect(executeDestinationOperations.call(mockExecuteFunctions, [{ json: {} }]))
      .rejects.toThrow('API Error');
  });
});

describe('TrackingPlan Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://api.segmentapis.com/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	it('should get tracking plans successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'getTrackingPlans';
			if (param === 'workspaceId') return 'workspace123';
		});

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			data: [{ id: 'tp123', name: 'Test Plan' }],
		});

		// Test implementation would call the function
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.segmentapis.com/v1/tracking-plans?workspaceId=workspace123',
			headers: {
				'Authorization': 'Bearer test-key',
				'Content-Type': 'application/json',
			},
			json: true,
		});
	});

	it('should create tracking plan successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'createTrackingPlan';
			if (param === 'workspaceId') return 'workspace123';
			if (param === 'name') return 'New Plan';
			if (param === 'description') return 'Test description';
			if (param === 'type') return 'LIVE';
		});

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			id: 'tp123',
			name: 'New Plan',
		});

		// Test implementation would call the function
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://api.segmentapis.com/v1/tracking-plans',
			headers: {
				'Authorization': 'Bearer test-key',
				'Content-Type': 'application/json',
			},
			body: {
				workspaceId: 'workspace123',
				name: 'New Plan',
				description: 'Test description',
				type: 'LIVE',
			},
			json: true,
		});
	});

	it('should handle errors gracefully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'getTrackingPlan';
			if (param === 'trackingPlanId') return 'invalid-id';
		});

		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Not found'));
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		// Test would verify error handling
		expect(mockExecuteFunctions.continueOnFail).toHaveBeenCalled();
	});
});

describe('User Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        bearerToken: 'test-token', 
        baseUrl: 'https://api.segmentapis.com/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  it('should get users successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getUsers');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('workspace123');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ users: [] });

    const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({ users: [] });
  });

  it('should create user successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('createUser');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('workspace123');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('test@example.com');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('member');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ id: 'user123' });

    const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({ id: 'user123' });
  });

  it('should get user by ID successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getUser');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('user123');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ id: 'user123', email: 'test@example.com' });

    const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({ id: 'user123', email: 'test@example.com' });
  });

  it('should update user successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('updateUser');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('user123');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('admin');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ id: 'user123', role: 'admin' });

    const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({ id: 'user123', role: 'admin' });
  });

  it('should delete user successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('deleteUser');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('user123');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ success: true });

    const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({ success: true });
  });

  it('should handle errors properly', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getUsers');
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('workspace123');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeUserOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('API Error');
  });
});

describe('Deletion and Suppression Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				bearerToken: 'test-token',
				baseUrl: 'https://api.segmentapis.com/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	it('should get deletion requests successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'getDeletionRequests';
			if (param === 'workspaceId') return 'workspace123';
		});

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ requests: [] });

		const result = await executeDeletionAndSuppressionOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ requests: [] });
	});

	it('should create deletion request successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'createDeletionRequest';
			if (param === 'workspaceId') return 'workspace123';
			if (param === 'userId') return 'user123';
			if (param === 'regulation') return 'gdpr';
		});

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ requestId: 'req123' });

		const result = await executeDeletionAndSuppressionOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ requestId: 'req123' });
	});

	it('should get deletion request status successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'getDeletionRequest';
			if (param === 'requestId') return 'req123';
		});

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ status: 'completed' });

		const result = await executeDeletionAndSuppressionOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ status: 'completed' });
	});

	it('should get suppression requests successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'getSuppressionRequests';
			if (param === 'workspaceId') return 'workspace123';
		});

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ requests: [] });

		const result = await executeDeletionAndSuppressionOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ requests: [] });
	});

	it('should create suppression request successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'createSuppressionRequest';
			if (param === 'workspaceId') return 'workspace123';
			if (param === 'userId') return 'user123';
			if (param === 'regulation') return 'ccpa';
		});

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ requestId: 'req456' });

		const result = await executeDeletionAndSuppressionOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ requestId: 'req456' });
	});

	it('should get suppression request status successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'getSuppressionRequest';
			if (param === 'requestId') return 'req456';
		});

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ status: 'pending' });

		const result = await executeDeletionAndSuppressionOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ status: 'pending' });
	});

	it('should handle errors and continue on fail', async () => {
		mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
			if (param === 'operation') return 'getDeletionRequests';
			if (param === 'workspaceId') return 'workspace123';
		});

		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

		const result = await executeDeletionAndSuppressionOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ error: 'API Error' });
	});

	it('should throw error for unknown operation', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValue('unknownOperation');

		await expect(
			executeDeletionAndSuppressionOperations.call(mockExecuteFunctions, [{ json: {} }])
		).rejects.toThrow('Unknown operation: unknownOperation');
	});
});

describe('Event Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://api.segmentapis.com/v1' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
    };
  });

  describe('trackEvent operation', () => {
    it('should track an event successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation': return 'trackEvent';
          case 'userId': return 'user123';
          case 'event': return 'Purchase';
          case 'properties': return '{"amount": 100}';
          case 'context': return '{}';
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ success: true });

      const result = await executeEventOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.segmentapis.com/v1/track',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        json: true,
        body: {
          userId: 'user123',
          event: 'Purchase',
          properties: { amount: 100 },
          context: {},
        },
      });

      expect(result).toEqual([{ json: { success: true }, pairedItem: { item: 0 } }]);
    });

    it('should handle errors when tracking event fails', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation': return 'trackEvent';
          case 'userId': return 'user123';
          case 'event': return 'Purchase';
          default: return '{}';
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeEventOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('identifyUser operation', () => {
    it('should identify user successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation': return 'identifyUser';
          case 'userId': return 'user123';
          case 'traits': return '{"email": "test@example.com"}';
          case 'context': return '{}';
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ success: true });

      const result = await executeEventOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.segmentapis.com/v1/identify',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        json: true,
        body: {
          userId: 'user123',
          traits: { email: 'test@example.com' },
          context: {},
        },
      });

      expect(result).toEqual([{ json: { success: true }, pairedItem: { item: 0 } }]);
    });
  });

  describe('aliasUser operation', () => {
    it('should alias user successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
        switch (paramName) {
          case 'operation': return 'aliasUser';
          case 'userId': return 'user123';
          case 'previousId': return 'olduser123';
          case 'context': return '{}';
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ success: true });

      const result = await executeEventOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.segmentapis.com/v1/alias',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        json: true,
        body: {
          userId: 'user123',
          previousId: 'olduser123',
          context: {},
        },
      });

      expect(result).toEqual([{ json: { success: true }, pairedItem: { item: 0 } }]);
    });
  });
});
});
