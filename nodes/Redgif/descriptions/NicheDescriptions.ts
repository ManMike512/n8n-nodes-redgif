import type { INodeProperties } from 'n8n-workflow';

export const nicheOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['niche'] } },
		options: [
			{ name: 'Get Niches', value: 'getNiches', description: 'Get all gifs from niches', action: 'Get niches' },
		],
		default: 'getNiches',
	},
];

export const nicheFields: INodeProperties[] = [
	// ── Niche ID ──
	{
		displayName: 'Niche ID',
		name: 'nicheId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the niche',
		displayOptions: { show: { resource: ['niche'] } },
	},

		{
			displayName: 'Bearer Token',
			name: 'bearerToken',
			type: 'string',
			required: true,
			default: '',
			description: 'The bearer token for authentication',
			displayOptions: { show: { resource: ['niche'] } },
			typeOptions: { password: true },
		},

		// ── Fetch Messages options ──
	{
		displayName: 'Fetch Options',
		name: 'searchOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['niche'], operation: ['getNiches'] } },
		options: [
			{
				displayName: 'Limit',
				name: 'count',
				type: 'number',
				default: 50,
				description: 'Maximum number of gifs to return',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'The page number to return',
			},
			{
				displayName: 'Sort',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Hot', value: 'hot' },
					{ name: 'Latest', value: 'latest' },
					{ name: 'Top', value: 'top' },
				],
				default: "hot",
				description: 'The order in which to return the gifs',
			},

		],
	},

];
