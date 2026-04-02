import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SegmentCDPApi implements ICredentialType {
	name = 'segmentCDPApi';
	displayName = 'Segment CDP API';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Personal Access Token (PAT) or Public API token from your Segment workspace settings',
		},
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.segmentapis.com/v1',
			description: 'Base URL for the Segment CDP API',
		},
	];
}