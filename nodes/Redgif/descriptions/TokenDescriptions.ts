import type { INodeProperties } from 'n8n-workflow';

export const tokenOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['token'] } },
		options: [
			{ name: 'Get Token', value: 'getToken', description: 'Get a token', action: 'Get token' },
		],
		default: 'getToken',
	},
];
