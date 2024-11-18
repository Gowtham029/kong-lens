/* eslint-disable @typescript-eslint/no-explicit-any */
import { keyValueType } from '../interfaces';

const getHighlightedContent = (value: string): string => {
  return `<span style="color:red;borderRadius:2px;background:#FAF2F4"} >&nbsp; ${value} &nbsp;</span>`;
};

export const BASE_API_URL: string =
  process.env.API_URL || 'http://localhost:8001';

export const AUTH_API_URL = 'http://localhost:9090';

export const ROUTE_TEXT_FIELDS: keyValueType[] = [
  {
    key: 'name',
    help: 'The name of the Route.',
    type: 'text',
    option: [],
    between: [],
  },

  {
    key: 'tags',
    help: 'Optionally add tags to the route',
    type: 'list',
    option: [],
    between: [],
  },

  {
    key: 'hosts',
    help: 'A list of domain names that match this Route. For example: example.com. At least one of hosts, paths, or methods must be set.',
    type: 'list',
    option: [],
    between: [],
  },

  {
    key: 'paths',
    help: 'A list of paths that match this Route. For example: /my-path. At least one of hosts, paths, or methods must be set.',
    type: 'list',
    option: [],
    between: [],
  },

  {
    key: 'headers',
    help: 'One or more lists of values indexed by header name that will cause this Route to match if present in the request. The Host header cannot be used with this attribute: hosts should be specified using the hosts attribute.Field values format example: x-some-header:foo,bar',
    type: 'list',
    option: [],
    between: [],
  },

  {
    key: 'path_handling',
    help: 'Controls how the Service path, Route path and requested path are combined when sending a request to the upstream. See above for a detailed description of each behavior. Accepted values are: "v0", "v1". Defaults to "v1".',
    type: 'dropdown',
    option: ['v1', 'v0'],
    between: [],
  },

  {
    key: 'https_redirect_status_code',
    help: 'The status code Kong responds with when all properties of a Route match except the protocol, i.e. if the protocol of the request is HTTP instead of HTTPS. Location header is injected by Kong if the field is set to 301, 302, 307 or 308. Defaults to 426.',
    type: 'number',
    option: [],
    between: [],
  },

  {
    key: 'regex_priority',
    help: 'A number used to choose which route resolves a given request when several routes match it using regexes simultaneously. When two routes match the path and have the same regex_priority, the older one (lowest created_at) is used. Note that the priority for non-regex routes is different (longer non-regex routes are matched before shorter ones). Defaults to 0.',
    type: 'number',
    option: [],
    between: [],
  },
  {
    key: 'methods',
    help: 'A list of HTTP methods that match this Route. At least one of hosts, paths, or methods must be set.',
    type: 'list',
    option: [],
    between: [],
  },
  {
    key: 'strip_path',
    help: 'When matching a Route via one of the paths, strip the matching prefix from the upstream request URL.',
    type: 'boolean',
    option: [],
    between: [],
  },
  {
    key: 'preserve_host',
    help: 'When matching a Route via one of the paths, strip the matching prefix from the upstream request URL.',
    type: 'boolean',
    option: [],
    between: [],
  },
  {
    key: 'protocols',
    help: 'A list of the protocols this Route should allow. By default it is ["http", "https"], which means that the Route accepts both. When set to ["https"], HTTP requests are answered with a request to upgrade to HTTPS.',
    type: 'list',
    option: [],
    between: [],
  },
  {
    key: 'snis',
    help: 'A list of SNIs that match this Route when using stream routing. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set.',
    type: 'list',
    option: [],
    between: [],
  },
  {
    key: 'sources',
    help: 'A list of IP sources of incoming connections that match this Route when using stream routing. Each entry is an object with fields “ip” (optionally in CIDR range notation) and/or “port”. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set.The field expects values with ip:port format. ex: 192.168.1.2:3000.',
    type: 'list',
    option: [],
    between: [],
  },
  {
    key: 'destinations',
    help: 'A list of IP destinations of incoming connections that match this Route when using stream routing. Each entry is an object with fields “ip” (optionally in CIDR range notation) and/or “port”. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set.The field expects values with ip:port format. ex: 192.168.1.2:3000',
    type: 'list',
    option: [],
    between: [],
  },
];

export const SERVICE_TEXT_FIELDS: keyValueType[] = [
  {
    key: 'name',
    help: 'The service name.',
    type: 'text',
    option: [],
    between: [],
  },
  {
    key: 'tags',
    help: 'Optionally add tags to the service',
    type: 'list',
    option: [],
    between: [],
  },
  {
    key: 'protocol',
    help: 'The protocol used to communicate with the upstream. It can be one of http or https.',
    type: 'text',
    option: [],
    between: [],
  },

  {
    key: 'host',
    help: 'The host of the upstream server.',
    type: 'text',
    option: [],
    between: [],
  },
  {
    key: 'port',
    help: 'The upstream server port. Defaults to 80.',
    type: 'number',
    option: [],
    between: [],
  },

  {
    key: 'path',
    help: 'The path to be used in requests to the upstream server. Empty by default.',
    type: 'text',
    option: [],
    between: [],
  },

  {
    key: 'retries',
    help: 'The number of retries to execute upon failure to proxy. The default is 5.',
    type: 'number',
    option: [],
    between: [],
  },

  {
    key: 'connect_timeout',
    help: 'The timeout in milliseconds for establishing a connection to your upstream server. Defaults to 60000',
    type: 'number',
    option: [],
    between: [],
  },

  {
    key: 'write_timeout',
    help: 'The timeout in milliseconds between two successive write operations for transmitting a request to the upstream server. Defaults to 60000',
    type: 'number',
    option: [],
    between: [],
  },

  {
    key: 'read_timeout',
    help: 'The timeout in milliseconds between two successive read operations for transmitting a request to the upstream server. Defaults to 60000',
    type: 'number',
    option: [],
    between: [],
  },
  {
    key: 'client_certificate',
    help: 'Certificate (id) to be used as client certificate while TLS handshaking to the upstream server.',
    type: 'text',
    option: [],
    between: [],
  },
];

export const CONSUMER_TEXT_FIELDS: keyValueType[] = [
  {
    key: 'username',
    help: 'The username of the consumer. You must send either this field or custom_id with the request.',
    type: 'text',
    option: [],
    between: [],
  },

  {
    key: 'custom_id',
    help: 'Field for storing an existing ID for the consumer, useful for mapping Kong with users in your existing database. You must send either this field or username with the request.',
    type: 'text',
    option: [],
    between: [],
  },
  {
    key: 'tags',
    help: 'Optionally add tags to the consumer',
    type: 'list',
    option: [],
    between: [],
  },
];
export const SERVICE_DETAILS_INTERFACE = {
  id: '',
  name: '',
  retries: 5,
  protocol: '',
  host: '',
  port: 80,
  path: '',
  connect_timeout: 60000,
  write_timeout: 60000,
  read_timeout: 60000,
  tags: [],
  client_certificate: '',
  ca_certificates: '',
};

export const ROUTE_DETAILS_INTERFACE = {
  name: '',
  tags: [],
  hosts: [],
  paths: [],
  headers: [],
  path_handling: 'v1',
  https_redirect_status_code: 426,
  regex_priority: 0,
  methods: [],
  strip_path: true,
  preserve_host: false,
  protocols: ['http', 'https'],
  snis: [],
  sources: [],
  destinations: [],
  service: {},
};

export const BASIC_AUTH_FORM_INTERFACE = {
  consumer: '',
  anonymous: '',
  'hide credentials': false,
};

export const KEY_AUTH_FORM_INTERFACE = {
  consumer: '',
  'key names': '',
  'hide credentials': false,
  anonymous: '',
  'key in header': true,
  'key in query': true,
  'key in body': false,
  'run on preflight': true,
};

export const OAUTH2_FORM_INTERFACE = {
  consumer: '',
  scopes: [],
  'mandatory scope': false,
  'provision key': '',
  'token expiration': 7200,
  'enable authorization code': false,
  'enable implicit grant': false,
  'enable client credentials': false,
  'enable password grant': false,
  'hide credentials': false,
  'accept http if already terminated': false,
  anonymous: '',
  'global credentials': false,
  'auth header name': 'authorization',
  'refresh token ttl': 1209600,
  'reuse refresh token': false,
  pkce: 'lax',
};

export const HMAC_AUTH_FORM_INTERFACE = {
  hide_credentials: false,
  clock_skew: 300,
  anonymous: '',
  validate_request_body: false,
  enforce_headers: [],
  algorithms: ['hmac-sha1', 'hmac-sha256', 'hmac-sha384', 'hmac-sha512'],
};

export const JWT_FORM_INTERFACE = {
  'uri param names': ['jwt'],
  'cookie names': '',
  'key claim name': '',
  'secret is base64': false,
  'claims to verify': [],
  anonymous: '',
  'run on preflight': true,
  'maximum expiration': 0,
  'header names': ['authorization'],
};

export const LDAP_FORM_INTERFACE = {
  'ldap host': '',
  'ldap port': 389,
  ldaps: '',
  'start tls': '',
  'verify ldap host': '',
  'base dn': '',
  attribute: '',
  'cache ttl': 60,
  'hide credentials': '',
  timeout: 10000,
  keepalive: 60000,
  anonymous: '',
  'header type': 'ldap',
};

export const SESSION_FORM_INTERFACE = {
  secret: 'okNlz1adrIkcKzW861zWpld1pZIFfjofFpWq1IWPSIoh',
  'cookie name': 'session',
  'cookie lifetime': 3600,
  'cookie idletime': '',
  'cookie renew': 600,
  'cookie path': '/',
  'cookie domain': '',
  'cookie samesite': 'Strict',
  'cookie httponly': true,
  'cookie secure': true,
  'cookie discard': 10,
  storage: 'cookie',
  'logout methods': ['POST', 'DELETE'],
  'logout query arg': 'session_logout',
  'logout post arg': 'session_logout',
};

export const CONSUMER_DETAILS_INTERFACE = {
  username: '',
  custom_id: '',
  tags: [],
};

export const PLUGIN_DETAILS_INTERFACE = {
  consumer: null || '',
  id: '',
  service: null || {},
  protocols: [],
  name: '',
  enabled: true,
  config: {
    anonymous: null,
    hide_credentials: false,
  },
  route: null || {},
  tags: null || [],
};

export const API_RESPONSE_SNACK_MESSAGE = {
  unableToFetchData: 'Unable to Fetch data, Please try again!',
  couldNotModifyData: 'Could not able to modify data!',
  unableToSaveData: 'Unable to save data, Please try again!',
  createdNewService: 'Successfully created the service!',
  createdNewUpstream: 'Successfully created the upstream!',
  modifiedExistingUpstream: 'Successfully modified the upstream!',
  modifiedExistingService: 'Successfully modified the service!',
  createdNewRoute: 'Successfully created the Route!',
  modifiedExistingRoute: 'Successfully modified the Route!',
  deletedService: 'Successfully deleted the Service',
  deletedUpstream: 'Successfully deleted the Upstream',
  deletedRoute: 'Successfully deleted the Route',
  unableToDelete: 'Unable to delete data, Please try again!',
  fetchedData: 'Successfully fetched data!',
  incorrectHeader: 'schema violation (headers: expected a map)',
  errorWhileLogin: 'Please try again!',
  deletedConsumer: 'Successfully deleted the Consumer!',
  modifiedConumer: 'Successfully modified the consumer details!',
  deletedPlugin: 'Successfully deleted the Plugin!',
  modifiedPlugin: 'Successfully modified the Plugin details!',
  copiedToClipboard: 'Copied to clipboard successfully!',
};

export const PROCESS_TYPE = {
  PRE_PROCESS: 'PRE_PROCESS',
  POST_PROCESS: 'POST_PROCESS',
};

export const ROUTE_TYPE = {
  SERVICE: 'Service',
  ROUTE: 'Route',
};

export const CREDS_SCHEMA = {
  'basic-auth': {
    header: 'basic-auth',
    description: 'Manage Basic Auth credentials for ',
    textFields: [
      {
        key: 'username',
        help: 'The username to use in the Basic Authentication',
        required: true,
        type: 'string',
        option: [],
        between: [],
      },
      {
        key: 'password',
        help: 'The password to use in the Basic Authentication',
        required: false,
        type: 'string',
        option: [],
        between: [],
      },
    ],
  },
  'key-auth': {
    description: 'Create Api Key for ',
    textFields: [
      {
        key: 'key',
        help: 'You can optionally set your own unique key to authenticate the client. If missing, the plugin will generate one.',
        type: 'string',
        option: [],
        between: [],
      },
    ],
  },
  'hmac-auth': {
    description: 'Create HMAC credentials for',
    textFields: [
      {
        key: 'username',
        help: 'The username to use in the HMAC Signature verification.',
        type: 'string',
        required: true,
        option: [],
        between: [],
      },
      {
        key: 'secret',
        help: "The secret to use in the HMAC Signature verification. Note that if this parameter isn't provided, Kong will generate a value for you and send it as part of the response body.",
        type: 'string',
        option: [],
        between: [],
      },
    ],
  },
  oauth2: {
    desciption: 'Create OAuth2 for ',
    textFields: [
      {
        key: 'name',
        help: 'The name to associate to the credential. In OAuth 2.0 this would be the application name.',
        required: true,
        type: 'string',
        option: [],
        between: [],
      },
      {
        key: 'client_id',
        required: false,
        help: 'You can optionally set your own unique client_id. If missing, the plugin will generate one.',
        type: 'string',
        option: [],
        between: [],
      },
      {
        required: false,
        key: 'client_secret',
        help: 'You can optionally set your own unique client_secret. If missing, the plugin will generate one.',
        type: 'string',
        option: [],
        between: [],
      },
      {
        key: 'redirect_uri',
        required: true,
        help: 'The URL in your app where users will be sent after authorization.',
        type: 'string',
        option: [],
        between: [],
      },
    ],
  },

  jwt: {
    description: 'Create JWT for ',
    textFields: [
      {
        key: 'key',
        help: 'A unique string identifying the credential. If left out, it will be auto-generated.',
        type: 'string',
        option: [],
        between: [],
      },
      {
        key: 'algorithm',
        help: "The algorithm used to verify the token's signature. Can be HS256, RS256, or ES256.",
        type: 'dropdown',
        enum: ['HS256', 'RS256', 'ES256'],
        default: 'HS256',
        option: ['HS256', 'RS256', 'ES256'],
        between: [],
      },
      {
        key: 'rsa_public_key',
        help: "If algorithm is RS256 or ES256, the public key (in PEM format) to use to verify the token's signature.",
        type: 'textarea',
        option: [],
        between: [],
      },
      {
        key: 'secret',
        help: 'If algorithm is HS256 or ES256, the secret used to sign JWTs for this credential. If left out, will be auto-generated.',
        type: 'string',
        option: [],
        between: [],
      },
    ],
  },
};

export const tableHeadersCreds: any = {
  'basic-auth': {
    username: { header: 'username', width: '20%' },
    password: { header: 'password', width: '40%' },
    created_at: { header: 'created', width: 'auto' },
  },
  'api-key': {
    key: { header: 'key', width: '40%' },
    created_at: { header: 'created', width: 'auto' },
  },
  'hmac-auth': {
    username: { header: 'username', width: '20%' },
    secret: { header: 'secret', width: '40%' },
    created_at: { header: 'created', width: 'auto' },
  },
  oauth2: {
    name: { header: 'name', width: '20%' },
    client_id: { header: 'client id', width: '40%' },
    redirect_uris: { header: 'redirect uris', width: 'auto' },
    created_at: { header: 'created', width: 'auto' },
  },
};

export const UPSTREAM_DETAILS_INTERFACE: any = {
  name: '',
  tags: [],
  hash_on: 'none',
  hash_fallback: 'none',
  hash_on_header: '',
  hash_on_fallback_header: '',
  hash_on_cookie: '',
  hash_on_cookie_path: '',
  slots: 1000,
};

export const UPSTREAM_DETAILS_TEXTFIELDS: any = [
  {
    key: 'name',
    help: ' This is a hostname like name that can be referenced in an <code>upstream_url</code> field of an <code>api</code> or the <code>host</code> of a service.',
    type: 'text',
    option: [],
    between: [],
  },
  {
    key: 'tags',
    option: [],
    help: '',
    type: 'list',
    between: [],
  },
  {
    key: 'hash_on',
    option: ['none', 'consumer', 'id', 'header', 'cookie'],
    help: 'What to use as hashing input: <code>none</code>, <code>consumer</code>, <code>ip</code>, <code>header</code> or <code>cookie</code> (defaults to <code>none</code> resulting in a weighted-round-robin scheme).',
    type: 'dropdown',
    between: [],
  },
  {
    key: 'hash_fallback',
    option: ['none', 'consumer', 'id', 'header'],
    help: 'What to use as hashing input if the primary <code>hash_on</code> does not return a hash (eg. header is missing, or no consumer identified)',
    type: 'dropdown',
  },
  {
    key: 'hash_on_header',
    option: [],
    help: ' The header name to take the value from as hash input. Only required when <code>hash_on</code> is set to <code>header</code>.',
    type: 'text',
    between: [],
  },
  {
    key: 'hash_fallback_header',
    option: [],
    help: 'The header name to take the value from as hash input. Only required when <code>hash_fallback</code> is set to <code>header</code>.',
    type: 'text',
    between: [],
  },
  {
    key: 'hash_on_cookie',
    option: [],
    help: '  The cookie name to take the value from as hash input.Only required when <code>hash_on</code> or <code>hash_fallback</code> is set to <code>cookie</code>.If the specified cookie is not in the request, Kong will generate a value and set the cookie in the response.',
    type: 'text',
    between: [],
  },
  {
    key: 'hash_on_cookie_path',
    option: [],
    help: ' The cookie path to set in the response headers. Only required when <code>hash_on</code> or <code>hash_fallback</code> is set to cookie. Defaults to <code>"/"</code>.',
    type: 'text',
    between: [],
  },
  {
    key: 'slots',
    option: [],
    help: 'The number of slots in the loadbalancer algorithm (<code>10-65536</code>, defaults to <code>1000</code>).',
    type: 'number',
    between: [],
  },
];

export const addPlugins = {
  Authentication: [
    {
      header: 'Basic Auth',
      image: '/basic-auth.png',
      description: 'Add Basic Authentication to your APIs',
      toolTip: 'basic auth',
      scope: 'global',
      headerDescription: `Add Basic Authentication to your APIs, with username and password protection. The plugin will check for valid credentials in the  ${getHighlightedContent(
        'Proxy Authorization'
      )} and ${getHighlightedContent('Authorization')} header (in this order).`,
      textFields: [
        {
          key: 'consumer',
          help: 'The CONSUMER ID that this plugin configuration will target. This value can only be used if authentication has been enabled so that the system can identify the user making the request. If left blank, the plugin will be applied to all consumers.',
          type: 'text',
          option: [],
          between: [],
        },
        {
          key: 'anonymous',
          help: '',
          type: 'textBox',
          option: [],
          between: [],
        },
        {
          key: 'hide credentials',
          help: 'An optional boolean value telling the plugin to hide the credential to the upstream API server. It will be removed by Kong before proxying the request',
          type: 'boolean',
          option: [],
          between: [],
        },
      ],
      initialContent: BASIC_AUTH_FORM_INTERFACE,
      toggleValues: ['hide credentials'],
      formHeader: 'ADD BASIC AUTH',
    },
    {
      header: 'Key Auth',
      image: '/key-auth.png',
      description: 'Add a key authentication to your APIs',
      toolTip: 'key auth',
      scope: 'global',
      headerDescription:
        'Add Key Authentication (also referred to as an API key) to your APIs. Consumers then add their key either in a querystring parameter or a header to authenticate their requests.',
      textFields: [
        {
          key: 'consumer',
          help: 'The CONSUMER ID that this plugin configuration will target. This value can only be used if authentication has been enabled so that the system can identify the user making the request. If left blank, the plugin will be applied to all consumers.',
          type: 'text',
          option: [],
          between: [],
        },
        {
          key: 'key names',
          help: 'Describes an array of comma separated parameter names where the plugin will look for a key. The client must send the authentication key in one of those key names, and the plugin will try to read the credential from a header or the querystring parameter with the same name.',
          type: 'list',
          option: [],
          between: [],
        },

        {
          key: 'hide credentials',
          help: 'An optional boolean value telling the plugin to hide the credential to the upstream API server. It will be removed by Kong before proxying the request',
          type: 'boolean',
          option: [],
          between: [],
        },
        {
          key: 'anonymous',
          help: '',
          type: 'textBox',
          option: [],
          between: [],
        },
        {
          key: 'key in header',
          help: '',
          type: 'boolean',
          option: [],
          between: [],
        },
        {
          key: 'key in query',
          help: '',
          type: 'boolean',
          option: [],
          between: [],
        },
        {
          key: 'key in body',
          help: '',
          type: 'boolean',
          option: [],
          between: [],
        },
        {
          key: 'run on preflight',
          help: '',
          type: 'boolean',
          option: [],
          between: [],
        },
      ],
      initialContent: KEY_AUTH_FORM_INTERFACE,
      toggleValues: [
        'hide credentials',
        'key in header',
        'key in query',
        'key in body',
        'run on preflight',
      ],
      formHeader: 'ADD KEY AUTH',
    },
    {
      header: 'oauth2',
      image: '/oauth2.png',
      description: 'Add an OAuth 2.0 authentication to your APIs',
      toolTip: 'oauth2',
      scope: 'global',
      formHeader: 'ADD OAUTH2',
      initialContent: OAUTH2_FORM_INTERFACE,
      headerDescription:
        'Add an OAuth 2.0 authentication layer with the Authorization Code Grant, Client Credentials, Implicit Grant or Resource Owner Password Credentials Grant flow. This plugin requires the SSL Plugin with the only_https parameter set to true to be already installed on the API, failing to do so will result in a security weakness.',
      textFields: [
        {
          key: 'consumer',
          help: 'The CONSUMER ID that this plugin configuration will target. This value can only be used if authentication has been enabled so that the system can identify the user making the request. If left blank, the plugin will be applied to all consumers.',
          type: 'text',
          option: [],
          between: [],
        },
        {
          key: 'scopes',
          help: 'Describes an array of comma separated scope names that will be available to the end user',
          type: 'list',
          option: [],
          between: [],
        },
        {
          key: 'mandatory scope',
          help: 'An optional boolean value telling the plugin to require at least one scope to be authorized by the end user',
          type: 'text',
          option: [],
          between: [],
        },
        {
          key: 'provision key',
          help: '',
          type: 'textbox',
          option: [],
          between: [],
        },
        {
          key: 'token expiration',
          help: 'An optional integer value telling the plugin how long should a token last, after which the client will need to refresh the token. Set to 0 to disable the expiration.',
          type: 'number',
          option: [],
          between: [],
        },
        {
          key: 'enable authorization code',
          help: 'An optional boolean value to enable the three-legged Authorization Code flow (RFC 6742 Section 4.1)',
          type: 'boolean',
          option: [],
          between: [],
        },
        {
          key: 'enable implicit grant',
          help: 'An optional boolean value to enable the Implicit Grant flow which allows to provision a token as a result of the authorization process (RFC 6742 Section 4.2)',
          type: 'boolean',
          option: [],
          between: [],
        },
        {
          key: 'enable client credentials',
          help: 'An optional boolean value to enable the Client Credentials Grant flow (RFC 6742 Section 4.4)',
          type: 'boolean',
          option: [],
          between: [],
        },
        {
          key: 'enable password grant',
          help: 'An optional boolean value to enable the Resource Owner Password Credentials Grant flow (RFC 6742 Section 4.3)',
          type: 'boolean',
          option: [],
          between: [],
        },
        {
          key: 'hide credentials',
          help: 'An optional boolean value telling the plugin to hide the credential to the upstream API server. It will be removed by Kong before proxying the request',
          type: 'boolean',
          option: [],
          between: [],
        },
        {
          key: 'accept http if already terminated',
          help: 'Accepts HTTPs requests that have already been terminated by a proxy or load balancer and the x-forwarded-proto: https header has been added to the request. Only enable this option if the Kong server cannot be publicly accessed and the only entry-point is such proxy or load balancer.',
          type: 'boolean',
          option: [],
          between: [],
        },
        {
          key: 'anonymous',
          help: '',
          type: 'textbox',
          option: [],
          between: [],
        },
        {
          key: 'global credentials',
          help: '',
          type: 'boolean',
          option: [],
          between: [],
        },
        {
          key: 'auth header name',
          help: '',
          type: 'textbox',
          option: [],
          between: [],
        },
        {
          key: 'refresh token ttl',
          help: '',
          type: 'number',
          option: [],
          between: [],
        },
        {
          key: 'reuse refresh token',
          help: '',
          type: 'boolean',
          option: [],
          between: [],
        },
        {
          key: 'pkce',
          help: '',
          type: 'dropdown',
          option: ['none', 'lax', 'strict'],
          between: [],
        },
      ],
      toggleValues: [
        'mandatory scope',
        'enable authorization code',
        'enable implicit grant',
        'enable client credentials',
        'enable password grant',
        'hide credentials',
        'accept http if already terminated',
        'global credentials',
        'reuse refresh token',
      ],
    },
    {
      header: 'Hmac Auth',
      image: '/hmac-auth.png',
      description: 'Add HMAC Authentication to your APIs',
      toolTip: 'hmac auth',
      scope: 'global',
      headerDescription:
        'Add HMAC Signature Authentication to your APIs to establish the identity of the consumer. The plugin will check for valid signature in the Proxy-Authorization and Authorization header (in this order). This plugin implementation follows the draft-cavage-http-signatures-00 draft with slightly changed signature scheme.',
      toggleValues: ['hide credentials', 'validate request body'],
      formHeader: 'ADD HMAC AUTH',
      initialContent: HMAC_AUTH_FORM_INTERFACE,
      textFields: [
        {
          key: 'consumer',
          help: 'The CONSUMER ID that this plugin configuration will target. This value can only be used if authentication has been enabled so that the system can identify the user making the request. If left blank, the plugin will be applied to all consumers.',
          type: 'text',
          option: [],
          between: [],
        },
        {
          key: 'hide credentials',
          type: 'boolean',
          option: [],
          help: '',
          between: [],
        },
        {
          key: 'clock skew',
          type: 'number',
          option: [],
          help: '',
          between: [],
        },
        { key: 'anonymous', type: 'text', option: [], help: '', between: [] },
        {
          key: 'validate request body',
          type: 'boolean',
          help: '',
          option: [],
          between: [],
        },
        {
          key: 'enforce headers',
          help: '',
          type: 'list',
          option: [],
          between: [],
        },
        {
          key: 'algorithms',
          help: '',
          option: [],
          type: 'list',
          between: [],
        },
      ],
    },
    {
      header: 'Jwt',
      image: '/jwt.png',
      description: 'Verify and authenticate JSON Web Tokens',
      toolTip: 'jwt',
      scope: 'global',
      formHeader: 'ADD JWT',
      headerDescription:
        'Verify requests containing HS256 or RS256 signed JSON Web Tokens (as specified in RFC 7519). Each of your Consumers will have JWT credentials (public and secret keys) which must be used to sign their JWTs. A token can then be passed through the Authorization header or in the request&apos;s URI and Kong will either proxy the request to your upstream services if the tokens signature is verified, or discard the request if not. Kong can also perform verifications on some of the registered claims of RFC 7519 (exp and nbf).',
      textFields: [
        {
          key: 'consumer',
          help: 'The CONSUMER ID that this plugin configuration will target. This value can only be used if authentication has been enabled so that the system can identify the user making the request. If left blank, the plugin will be applied to all consumers.',
          type: 'text',
          option: [],
          between: [],
        },
        {
          key: 'uri param names',
          type: 'list',
          option: [],
          help: 'A list of querystring parameters that Kong will inspect to retrieve JWTs.',
          between: [],
        },
        {
          key: 'cookie names',
          type: 'list',
          option: [],
          help: '',
          between: [],
        },
        {
          key: 'key claim name',
          option: [],
          type: 'text',
          help: 'The name of the claim in which the key identifying the secret must be passed.',
          between: [],
        },
        {
          key: 'secret is base64',
          type: 'boolean',
          option: [],
          between: [],
          help: "If true, the plugin assumes the credential's secret to be base64 encoded. You will need to create a base64 encoded secret for your consumer, and sign your JWT with the original secret.",
        },
        {
          key: 'claims to verify',
          type: 'dropdown',
          option: ['exp', 'nbf'],
          help: 'A list of registered claims (according to RFC 7519) that Kong can verify as well. Accepted values: exp, nbf.',
          between: [],
        },
        {
          key: 'anonymous',
          type: 'textbox',
          help: '',
          option: [],
          between: [],
        },
        {
          key: 'run on preflight',
          type: 'boolean',
          option: [],
          help: '',
          between: [],
        },
        {
          key: 'maximum expiration',
          type: 'number',
          option: [],
          between: [0, 31536000],
          help: '',
        },
        {
          key: 'header names',
          type: 'list',
          help: '',
          option: [],
          between: [],
        },
      ],
    },
    {
      header: 'Ldap Auth',
      image: '/ldap-auth.png',
      formHeader: 'ADD LDAP AUTH',
      description: 'Integrate Kong with a LDAP server',
      headerDescription: `Add LDAP Bind Authentication to your APIs, with username and password protection. The plugin will check for valid credentials in the ${getHighlightedContent(
        'Proxy-Authorization'
      )} and ${getHighlightedContent('Authorization')}header (in this order).`,
      toolTip: 'ldap auth',
      toggleValues: [
        'ldaps',
        'start tls',
        'verify ldap host',
        'hide credentials',
      ],
      initialContent: LDAP_FORM_INTERFACE,
      textFields: [
        {
          key: 'consumer',
          help: 'The CONSUMER ID that this plugin configuration will target. This value can only be used if authentication has been enabled so that the system can identify the user making the request. If left blank, the plugin will be applied to all consumers.',
          type: 'text',
          option: [],
          between: [],
        },
        {
          key: 'ldap host',
          option: [],
          help: 'Host on which the LDAP server is running.',
          type: 'text',
          between: [],
        },
        {
          key: 'ldap port',
          option: [],
          help: 'TCP port where the LDAP server is listening.',
          type: 'integer',
          between: [],
        },
        { key: 'ldaps', option: [], help: '', type: 'boolean' },
        {
          key: 'start tls',
          option: [],
          help: 'Set it to true to issue StartTLS (Transport Layer Security) extended operation over ldap connection.',
          type: 'boolean',
          between: [],
        },
        {
          key: 'verify ldap host',
          option: [],
          help: 'Set it to true to authenticate LDAP server. The server certificate will be verified according to the CA certificates specified by the lua_ssl_trusted_certificate directive.',
          type: 'boolean',
          between: [],
        },
        {
          key: 'base dn',
          option: [],
          help: 'Base DN as the starting point for the search.',
          type: 'text',
          between: [],
        },
        {
          key: 'attribute',
          option: [],
          help: 'Attribute to be used to search the user.',
          type: 'text',
          between: [],
        },
        {
          key: 'cache ttl',
          option: [],
          help: 'Cache expiry time in seconds.',
          type: 'number',
          between: [],
        },
        {
          key: 'hide credentials',
          option: [],
          help: 'An optional boolean value telling the plugin to hide the credential to the upstream API server. It will be removed by Kong before proxying the request',
          type: 'boolean',
          between: [],
        },
        {
          key: 'timeout',
          option: [],
          help: 'An optional timeout in milliseconds when waiting for connection with LDAP server.',
          type: 'number',
          between: [],
        },
        {
          key: 'keepalive',
          option: [],
          help: 'An optional value in milliseconds that defines for how long an idle connection to LDAP server will live before being closed.',
          type: 'number',
          between: [],
        },
        { key: 'anonymous', option: [], help: '', type: 'text', between: [] },
        { key: 'header type', option: [], help: '', type: 'text', between: [] },
      ],
      scope: 'global',
    },
    {
      header: 'Session',
      image: '/session.png',
      description: 'Support sessions for Kong Authentication Plugins.',
      toolTip: 'session',
      formHeader: 'ADD SESSION',
      headerDescription: 'Configure the Plugin.',
      toggleValues: ['cookie httponly', 'cookie secure'],
      scope: 'global',
      initialContent: SESSION_FORM_INTERFACE,
      textFields: [
        {
          key: 'consumer',
          help: 'The CONSUMER ID that this plugin configuration will target. This value can only be used if authentication has been enabled so that the system can identify the user making the request. If left blank, the plugin will be applied to all consumers.',
          type: 'text',
          option: [],
          between: [],
        },
        { key: 'secret', option: [], help: '', type: 'text', between: [] },
        { key: 'cookie name', option: [], help: '', type: 'text', between: [] },
        {
          key: 'cookie lifetime',
          option: [],
          help: '',
          type: 'number',
          between: [],
        },
        {
          key: 'cookie idletime',
          option: [],
          help: '',
          type: 'number',
          between: [],
        },
        {
          key: 'cookie renew',
          option: [],
          help: '',
          type: 'number',
          between: [],
        },
        { key: 'cookie path', option: [], help: '', type: 'text', between: [] },
        {
          key: 'cookie domain',
          option: [],
          help: '',
          type: 'text',
          between: [],
        },
        {
          key: 'cookie samesite',
          option: ['Strict', 'Lax', 'None', 'off'],
          help: '',
          type: 'dropdown',
          between: [],
        },
        {
          key: 'cookie httponly',
          option: [],
          help: '',
          type: 'boolean',
          between: [],
        },
        {
          key: 'cookie secure',
          option: [],
          help: '',
          type: 'boolean',
          between: [],
        },
        {
          key: 'cookie discard',
          option: [],
          help: '',
          type: 'number',
          between: [],
        },
        {
          key: 'storage',
          option: ['cookie', 'kong'],
          help: '',
          type: 'dropdown',
          between: [],
        },
        {
          key: 'logout methods',
          option: [],
          help: '',
          type: 'list',
          between: [],
        },
        {
          key: 'logout query arg',
          option: [],
          help: '',
          type: 'text',
          between: [],
        },
        {
          key: 'logout post arg',
          option: [],
          help: '',
          type: 'text',
          between: [],
        },
      ],
    },
  ],
  Security: [
    {
      header: 'Acl',
      image: '/acl.png',
      description: 'Control which consumers can access APIs',
      toolTip: 'acl',
      scope: 'global',
    },
    {
      header: 'Cors',
      image: '/cors.png',
      description: 'Allow developers to make requests from the browser',
      toolTip: 'cors',
      scope: 'global',
    },
    {
      header: 'Ip Restriction',
      image: '/ip-restriction.png',
      description: 'Whitelist or blacklist IPs that can make requests',
      toolTip: 'ip restriction',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Bot Detection',
      image: '/bot-detection.png',
      description: 'Detects and blocks bots or custom clients',
      toolTip: 'bot detection',
      scope: 'global',
    },
    {
      header: 'Acme',
      image: '/kong.svg',
      description: "Let's Encrypt and ACMEv2 integration with Kong",
      toolTip: 'acme',
      scope: 'global',
    },
  ],
  TrafficControl: [
    {
      header: 'Rate Limiting',
      image: '/rate-limiting.png',
      description: 'Rate-limit how many HTTP requests a developer can make',
      toolTip: 'rate limiting',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Response Ratelimiting',
      image: '/response-ratelimiting.png',
      description: 'Rate-Limiting based on a custom response header value',
      toolTip: 'response ratelimiting',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Request Size Limiting',
      image: '/request-size-limiting.png',
      description: 'Block requests with bodies greater than a specific size',
      toolTip: 'request size limiting',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Request Termination',
      image: '/request-termination.png',
      description:
        'This plugin terminates incoming requests with a specified status code',
      toolTip: 'request termination',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Proxy Cache',
      image: '/proxy-cache.png',
      description: 'Cache and serve commonly requested responses in Kong',
      toolTip: 'proxy cache',
      scope: 'globalOrSeparate',
    },
  ],
  Serverless: [
    {
      header: 'Aws Lambda',
      image: '/aws-lambda.png',
      description:
        'Invoke an AWS Lambda function from Kong. It can be used in combination with other request plugins to secure, manage or extend the function.',
      toolTip: 'aws lambda',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Pre Function',
      image: '/kong.svg',
      description: 'Dynamically run Lua code from Kong during access phase.',
      toolTip: 'pre function',
      scope: 'global',
    },
    {
      header: 'Post Function',
      image: '/kong.svg',
      description: 'Dynamically run Lua code from Kong during access phase.',
      toolTip: 'post function',
      scope: 'global',
    },
    {
      header: 'Azure Functions',
      image: '/azure-functions.png',
      description:
        'This plugin invokes Azure Functions. It can be used in combination with other request plugins to secure, manage or extend the function.',
      toolTip: 'azure functions',
      scope: 'globalOrSeparate',
    },
  ],
  AnalyticsAndMonitoring: [
    {
      header: 'Galileo',
      image: '/galileo.png',
      description: 'Business Intelligence Platform for APIs',
      toolTip: 'galileo',
      scope: 'separate',
    },
    {
      header: 'Runscope',
      image: '/runscope.png',
      description: 'API Performance Testing and Monitoring',
      toolTip: 'runscope',
      scope: 'separate',
    },
    {
      header: 'Datadog',
      image: '/datadog.png',
      description: 'Visualize API metrics on Datadog',
      toolTip: 'datadog',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Prometheus',
      image: '/prometheus.png',
      description:
        'Expose metrics related to Kong and proxied upstream services in Prometheus exposition format.',
      toolTip: 'prometheus',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Zipkin',
      image: '/zipkin.png',
      description:
        'Propagate Zipkin distributed tracing spans, and report spans to a Zipkin server.',
      toolTip: 'zipkin',
      scope: 'globalOrSeparate',
    },
  ],
  Transformation: [
    {
      header: 'Request Transformer',
      image: '/request-transformer.png',
      description: 'Modify the request before hitting the upstream server',
      toolTip: 'request transformer',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Response Transformer',
      image: '/response-transformer.png',
      description:
        'Modify the upstream response before returning it to the client',
      toolTip: 'response transformer',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Correlation Id',
      image: '/correlation-id.png',
      description: 'Correlate requests and responses using a unique ID',
      toolTip: 'correlation id',
      scope: 'globalOrSeparate',
    },
  ],
  Logging: [
    {
      header: 'Tcp Log',
      image: '/tcp-log.png',
      description: 'Send request and response logs to an TCP server',
      toolTip: 'tcp log',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Udp log',
      image: '/udp-log.png',
      description: 'Send request and response logs to an UDP server',
      toolTip: 'udp log',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Http log',
      image: '/http-log.png',
      description: 'Send request and response logs to an UDP server',
      toolTip: 'http log',
      scope: 'globalOrSeparate',
    },

    {
      header: 'File log',
      image: '/file-log.png',
      description: 'Append request and response data to a log file on disk',
      toolTip: 'file log',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Syslog',
      image: '/syslog.png',
      description: 'Send request and response logs to Syslog',
      toolTip: 'syslog',
      scope: 'globalOrSeparate',
    },
    {
      header: 'StatsD',
      image: '/statsd.png',
      description: 'Send request and response logs to StatsD',
      toolTip: 'statsd',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Loggly',
      image: '/loggly.png',
      description: 'Send request and response logs to Loggly',
      toolTip: 'loggly',
      scope: 'globalOrSeparate',
    },
  ],
  Others: [
    {
      header: 'Grpc Gateway',
      image: '/kong.svg',
      description: 'No description available',
      toolTip: 'grpc gateway',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Grpc Web',
      image: '/kong.svg',
      description: 'No description available',
      toolTip: 'grpc web',
      scope: 'globalOrSeparate',
    },
    {
      header: 'Opentelemetry',
      image: '/kong.svg',
      description: 'No description available',
      toolTip: 'opentelemetry',
      scope: 'globalOrSeparate',
    },
  ],
};

export const pluginDescriptions: any = {
  ssl: {
    meta: {
      description:
        'Dynamically binds a specific SSL certificate to the <code>request_host</code> value of a service. ' +
        'In case you want to setup a global SSL certificate for every API, take a look at the <a href="https://getkong.org/docs/0.9.x/configuration/#ssl_cert_path" target="_blank">Kong SSL configuration options.</a>' +
        '<br><span>If no <code>.cert</code> and <code>.key</code> files are provided, Konga will create self-signed certificates and send them to Kong ( <a href="https://www.openssl.org/">openssl library</a> must be available on your machine ).</span>',
    },
    cert: {
      type: 'file',
      help: 'Upload the certificate.crt file.',
    },
    key: {
      type: 'file',
      help: 'Upload the certificate.key file.',
    },
    only_https: {
      type: 'boolean',
      value: false,
      help: 'Specify if the service should only be available through an https protocol.',
    },
    accept_http_if_already_terminated: {
      type: 'boolean',
      value: false,
      help: 'If only_https is true, accepts HTTPs requests that have already been terminated by a proxy or load balancer and the x-forwarded-proto: https header has been added to the request. Only enable this option if the Kong server cannot be publicly accessed and the only entry-point is such proxy or load balancer.',
    },
  },
  'request-size-limiting': {
    meta: {
      description:
        'Block incoming requests whose body is greater than a specific size in megabytes.',
    },

    consumer_id: {
      displayName: 'Apply to',
      type: 'search',
      value: null,
      help:
        'The CONSUMER ID that this plugin configuration will target. ' +
        'This value can only be used if authentication has been enabled ' +
        'so that the system can identify the user making the request.' +
        ' If left blank, the plugin will be applied to all consumers.',
    },
    allowed_payload_size: {
      type: 'number',
      value: 128,
      help: 'Allowed request payload size in megabytes, default is 128 (128000000 Bytes)',
    },
  },
  'request-termination': {
    meta: {
      description:
        'This plugin terminates incoming requests with a specified status code and message. This allows to (temporarily) block an API or Consumer.',
    },
    content_type: {
      type: 'text',
      value: 'application/json; charset=utf-8',
      help: 'Content type of the raw response configured with config.body.',
    },
    status_code: {
      type: 'number',
      value: 503,
      help: 'The response code to send.',
    },
    message: {
      type: 'text',
      help: 'The message to send, if using the default response generator.',
    },
    body: {
      type: 'text',
      help: 'The raw response body to send, this is mutually exclusive with the config.message field.',
    },
  },
  'bot-detection': {
    meta: {
      description:
        'Protects your API from most common bots and has the capability of whitelisting and blacklisting custom clients.',
    },
    whitelist: {
      type: 'text',
      value: null,
      help: 'A comma separated array of regular expressions that should be whitelisted. The regular expressions will be checked against the User-Agent header.',
    },
    blacklist: {
      type: 'text',
      value: null,
      help: 'A comma separated array of regular expressions that should be blacklisted. The regular expressions will be checked against the User-Agent header.',
    },
  },
  'ip-restriction': {
    meta: {
      description:
        'Restrict access to an API by either whitelisting or blacklisting IP addresses. Single IPs, multiple IPs or ranges in <a href="https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation">CIDR notation</a> like <code>10.10.10.0/24</code> can be used.',
    },
    consumer_id: {
      displayName: 'Apply to',
      type: 'text',
      value: null,
      help:
        'The CONSUMER ID that this plugin configuration will target. ' +
        'This value can only be used if authentication has been enabled ' +
        'so that the system can identify the user making the request.' +
        ' If left blank, the plugin will be applied to all consumers.',
    },
    whitelist: {
      type: 'text',
      value: '',
      help: 'Comma separated list of IPs or CIDR ranges to whitelist. At least one between whitelist or blacklist must be specified.',
    },
    blacklist: {
      type: 'text',
      value: '',
      help: 'Comma separated list of IPs or CIDR ranges to blacklist. At least one between whitelist or blacklist must be specified.',
    },
  },
  cors: {
    meta: {
      description:
        'Easily add <strong>Cross-origin resource sharing (CORS)</strong> to your API by enabling this plugin.',
    },
    origin: {
      type: 'text',
      value: '',
      help: 'Value for the Access-Control-Allow-Origin header, expects a String.',
    },
    methods: {
      type: 'text',
      value: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      help: 'Value for the Access-Control-Allow-Methods header, expects a comma delimited string (e.g. GET,POST).',
    },
    headers: {
      type: 'text',
      value: '',
      help: 'Value for the Access-Control-Allow-Headers header, expects a comma delimited string (e.g. Origin, Authorization).',
    },
    exposed_headers: {
      type: 'text',
      value: '',
      help: 'Value for the Access-Control-Expose-Headers header, expects a comma delimited string (e.g. Origin, Authorization). If not specified, no custom headers are exposed.',
    },
    max_age: {
      type: 'number',
      help: 'Indicated how long the results of the preflight request can be cached, in seconds.',
    },
    preflight_continue: {
      type: 'boolean',
      value: false,
      help: 'A boolean value that instructs the plugin to proxy the OPTIONS preflight request to the upstream API.',
    },
    credentials: {
      type: 'boolean',
      value: false,
      help: 'Flag to determine whether the Access-Control-Allow-Credentials header should be sent with true as the value.',
    },
  },
  acl: {
    meta: {
      description:
        'Restrict access to an API by whitelisting or blacklisting consumers using arbitrary ACL group names. This plugin requires an <strong>authentication plugin</strong> to have been already enabled on the API.',
    },
    whitelist: {
      type: 'text',
      value: '',
      help: 'Comma separated list of arbitrary group names that are allowed to consume the API. At least one between whitelist or blacklist must be specified.',
    },
    blacklist: {
      type: 'text',
      value: '',
      help: 'Comma separated list of arbitrary group names that are not allowed to consume the API. At least one between whitelist or blacklist must be specified.',
    },
  },
  'ldap-auth': {
    meta: {
      description:
        'Add LDAP Bind Authentication to your APIs, with username and password protection. The plugin will check for valid credentials in the <code>Proxy-Authorization</code> and <code>Authorization</code> header (in this order).',
    },
    hide_credentials: {
      type: 'boolean',
      value: false,
      help: 'An optional boolean value telling the plugin to hide the credential to the upstream API server. It will be removed by Kong before proxying the request',
    },
    ldap_host: {
      type: 'text',
      value: '',
      help: 'Host on which the LDAP server is running.',
    },
    ldap_port: {
      type: 'number',
      value: '',
      help: 'TCP port where the LDAP server is listening.',
    },
    start_tls: {
      type: 'boolean',
      value: false,
      help: 'Set it to true to issue StartTLS (Transport Layer Security) extended operation over ldap connection.',
    },
    base_dn: {
      type: 'text',
      value: '',
      help: 'Base DN as the starting point for the search.',
    },
    verify_ldap_host: {
      type: 'boolean',
      value: false,
      help: 'Set it to true to authenticate LDAP server. The server certificate will be verified according to the CA certificates specified by the lua_ssl_trusted_certificate directive.',
    },
    attribute: {
      type: 'text',
      value: '',
      help: 'Attribute to be used to search the user.',
    },
    cache_ttl: {
      type: 'number',
      value: 60,
      help: 'Cache expiry time in seconds.',
    },
    timeout: {
      type: 'number',
      value: 10000,
      help: 'An optional timeout in milliseconds when waiting for connection with LDAP server.',
    },
    keepalive: {
      type: 'number',
      value: 60000,
      help: 'An optional value in milliseconds that defines for how long an idle connection to LDAP server will live before being closed.',
    },
  },
  'hmac-auth': {
    meta: {
      description:
        'Add HMAC Signature Authentication to your APIs to establish the identity of the consumer. The plugin will check for valid signature in the <code>Proxy-Authorization</code> and <code>Authorization</code> header (in this order). This plugin implementation follows the <a href="https://tools.ietf.org/html/draft-cavage-http-signatures-00">draft-cavage-http-signatures-00</a> draft with slightly changed signature scheme.',
    },
    hide_credentials: {
      type: 'boolean',
      value: false,
      help: 'An optional boolean value telling the plugin to hide the credential to the upstream API server. It will be removed by Kong before proxying the request',
    },
    clock_skew: {
      type: 'number',
      value: 300,
      help: 'Clock Skew in seconds to prevent replay attacks',
    },
  },
  'basic-auth': {
    meta: {
      description:
        'Add Basic Authentication to your APIs, with username and password protection. The plugin will check for valid credentials in the <code>Proxy-Authorization</code> and <code>Authorization</code> header (in this order).',
    },
    hide_credentials: {
      type: 'boolean',
      value: false,
      help: 'An optional boolean value telling the plugin to hide the credential to the upstream API server. It will be removed by Kong before proxying the request',
    },
  },
  'key-auth': {
    meta: {
      description:
        'Add Key Authentication (also referred to as an API key) to your APIs. Consumers then add their key either in a querystring parameter or a header to authenticate their requests.',
    },
    key_names: {
      type: 'text',
      value: 'apikey',
      help: 'Describes an array of comma separated parameter names where the plugin will look for a key. The client must send the authentication key in one of those key names, and the plugin will try to read the credential from a header or the querystring parameter with the same name.',
    },
    hide_credentials: {
      type: 'boolean',
      value: false,
      help: 'An optional boolean value telling the plugin to hide the credential to the upstream API server. It will be removed by Kong before proxying the request.',
    },
  },
  oauth2: {
    meta: {
      description:
        'Add an OAuth 2.0 authentication layer with the <a href="https://tools.ietf.org/html/rfc6749#section-4.1" target="_blank">Authorization Code Grant</a>, <a href="https://tools.ietf.org/html/rfc6749#section-4.4" target="_blank">Client Credentials</a>, <a href="https://tools.ietf.org/html/rfc6749#section-4.2" target="_blank">Implicit Grant</a> or <a href="https://tools.ietf.org/html/rfc6749#section-4.3" target="_blank">Resource Owner Password Credentials Grant</a> flow. This plugin requires the <a href="https://getkong.org/plugins/dynamic-ssl/" target="_blank">SSL Plugin</a> with the <code>only_https</code> parameter set to <code>true</code> to be already installed on the API, failing to do so will result in a security weakness.',
    },
    scopes: {
      type: 'text',
      value: '',
      help: 'Describes an array of comma separated scope names that will be available to the end user',
    },
    mandatory_scope: {
      type: 'boolean',
      value: false,
      help: 'An optional boolean value telling the plugin to require at least one scope to be authorized by the end user',
    },
    token_expiration: {
      type: 'number',
      value: 7200,
      help: 'An optional integer value telling the plugin how long should a token last, after which the client will need to refresh the token. Set to 0 to disable the expiration.',
    },
    enable_authorization_code: {
      type: 'boolean',
      value: false,
      help: 'An optional boolean value to enable the three-legged Authorization Code flow (RFC 6742 Section 4.1)',
    },
    enable_client_credentials: {
      type: 'boolean',
      value: false,
      help: 'An optional boolean value to enable the Client Credentials Grant flow (RFC 6742 Section 4.4)',
    },
    enable_implicit_grant: {
      type: 'boolean',
      value: false,
      help: 'An optional boolean value to enable the Implicit Grant flow which allows to provision a token as a result of the authorization process (RFC 6742 Section 4.2)',
    },
    enable_password_grant: {
      type: 'boolean',
      value: false,
      help: 'An optional boolean value to enable the Resource Owner Password Credentials Grant flow (RFC 6742 Section 4.3)',
    },
    hide_credentials: {
      type: 'boolean',
      value: false,
      help: 'An optional boolean value telling the plugin to hide the credential to the upstream API server. It will be removed by Kong before proxying the request',
    },
    accept_http_if_already_terminated: {
      type: 'boolean',
      value: false,
      help: 'Accepts HTTPs requests that have already been terminated by a proxy or load balancer and the x-forwarded-proto: https header has been added to the request. Only enable this option if the Kong server cannot be publicly accessed and the only entry-point is such proxy or load balancer.',
    },
  },
  jwt: {
    meta: {
      description:
        'Verify requests containing HS256 or RS256 signed JSON Web Tokens (as specified in RFC 7519). Each of your Consumers will have JWT credentials (public and secret keys) which must be used to sign their JWTs. A token can then be passed through the Authorization header or in the request\'s URI and Kong will either proxy the request to your upstream services if the token\'s signature is verified, or discard the request if not. Kong can also perform verifications on some of the registered claims of <a href="https://tools.ietf.org/html/rfc7519">RFC 7519</a> (exp and nbf).',
    },
    uri_param_names: {
      type: 'text',
      value: 'jwt',
      help: 'A list of querystring parameters that Kong will inspect to retrieve JWTs.',
    },
    claims_to_verify: {
      type: 'text',
      value: '',
      help: 'A list of registered claims (according to RFC 7519) that Kong can verify as well. Accepted values: exp, nbf.',
    },
    key_claim_name: {
      type: 'text',
      value: 'iss',
      help: 'The name of the claim in which the key identifying the secret must be passed.',
    },
    secret_is_base64: {
      type: 'boolean',
      value: false,
      help: "If true, the plugin assumes the credential's secret to be base64 encoded. You will need to create a base64 encoded secret for your consumer, and sign your JWT with the original secret.",
    },
  },
  'correlation-id': {
    meta: {
      description:
        'Correlate requests and responses using a unique ID transmitted over an HTTP header.',
    },
    header_name: {
      type: 'text',
      value: 'Kong-Request-ID',
      help: 'The HTTP header name to use for the correlation ID.',
    },
    generator: {
      type: 'select',
      options: ['uuid', 'uuid#counter', 'tracker'],
      value: 'uuid#counter',
      help: 'The generator to use for the correlation ID.',
    },
    echo_downstream: {
      type: 'boolean',
      value: false,
      help: 'Whether to echo the header back to downstream (the client).',
    },
  },
  datadog: {
    meta: {
      description:
        'Log API metrics like request count, request size, response status and latency to the local <a href="http://docs.datadoghq.com/guides/basic_agent_usage/">Datadog agent</a>.',
    },
    consumer_id: {
      displayName: 'Apply to',
      type: 'search',
      value: null,
      help:
        'The CONSUMER ID that this plugin configuration will target. ' +
        'This value can only be used if authentication has been enabled ' +
        'so that the system can identify the user making the request.' +
        ' If left blank, the plugin will be applied to all consumers.',
    },
    host: {
      type: 'text',
      value: '127.0.0.1',
      help: 'The IP address or host name to send data to',
    },
    port: {
      type: 'number',
      value: 8125,
      help: 'The port to send data to on the upstream server',
    },
    metrics: {
      type: 'chips',
      options: [
        'request_count',
        'request_size',
        'response_size',
        'latency',
        'status_count',
        'unique_users',
        'request_per_user',
      ],
      value: [
        'request_count',
        'request_size',
        'response_size',
        'latency',
        'status_count',
        'unique_users',
        'request_per_user',
      ],
      help: 'The metrics to be logged.',
    },
    timeout: {
      type: 'number',
      value: 10000,
      help: 'An optional timeout in milliseconds when sending data to the upstream server',
    },
  },
  runscope: {
    meta: {
      description:
        'Logs request and response data to <a href="https://www.runscope.com/">Runscope</a>.',
    },
    access_token: {
      type: 'text',
      value: '',
      help: 'The Runscope access token (or personal access token) for the Runscope API.',
    },
    bucket_key: {
      type: 'text',
      value: '',
      help: 'Your Runscope bucket ID where traffic data will be stored.',
    },
    log_body: {
      type: 'boolean',
      value: false,
      help: 'Whether or not the request and response bodies should be sent to Runscope.',
    },
    api_endpoint: {
      type: 'text',
      value: 'https://api.runscope.com',
      help: 'URL for the Runscope API.',
    },
    timeout: {
      type: 'number',
      value: 10000,
      help: 'An optional timeout in milliseconds when sending data to Runscope.',
    },
    keepalive: {
      type: 'number',
      value: 30,
      help: 'An optional value in milliseconds that defines for how long an idle connection will live before being closed.',
    },
  },
  galileo: {
    meta: {
      description:
        'Logs request and response data to <a href="https://getgalileo.io/">Galileo</a>, the analytics platform for monitoring, visualizing and inspecting API & microservice traffic.',
    },
    consumer_id: {
      displayName: 'Apply to',
      type: 'search',
      value: '',
      help:
        'The CONSUMER ID that this plugin configuration will target. ' +
        'This value can only be used if authentication has been enabled ' +
        'so that the system can identify the user making the request.' +
        ' If left blank, the plugin will be applied to all consumers.',
    },
    service_token: {
      type: 'text',
      value: '',
      help: 'The service token provided to you by Galileo.',
    },
    environment: {
      type: 'text',
      value: '',
      help: 'Slug of your Galileo environment name. None by default.',
    },
    log_bodies: {
      type: 'boolean',
      value: false,
      help: 'Capture and send request/response bodies.',
    },
    retry_count: {
      type: 'number',
      value: 10,
      help: 'Number of retries in case of failure to send data to Galileo.',
    },
    connection_timeout: {
      type: 'number',
      value: 30,
      help: 'Timeout in seconds before aborting a connection to Galileo.',
    },
    flush_timeout: {
      type: 'number',
      value: 2,
      help: 'Timeout in seconds before flushing the current data to Galileo in case of inactivity.',
    },
    queue_size: {
      type: 'number',
      value: 1000,
      help: 'Number of calls to trigger a flush of the buffered data to Galileo.',
    },
    host: {
      type: 'text',
      value: 'collector.galileo.mashape.com',
      help: 'Host address of the Galileo collector.',
    },
    port: {
      type: 'number',
      value: 443,
      help: 'Port of the Galileo collector.',
    },
    https: {
      type: 'boolean',
      value: true,
      help: 'Use of HTTPs to connect with the Galileo collector.',
    },
  },
  'rate-limiting': {
    meta: {
      description:
        'Rate limit how many HTTP requests a developer can make in a given period of seconds, minutes, hours, days, months or years. If the API has no authentication layer, the <strong>Client IP</strong> address will be used, otherwise the Consumer will be used if an authentication plugin has been configured.',
    },
    consumer_id: {
      displayName: 'Apply to',
      type: 'search',
      value: '',
      help:
        'The CONSUMER ID that this plugin configuration will target. ' +
        'This value can only be used if authentication has been enabled ' +
        'so that the system can identify the user making the request.' +
        ' If left blank, the plugin will target all consumers.',
    },
    second: {
      type: 'number',
      value: 0,
      help: 'The amount of HTTP requests the developer can make per second. At least one limit must exist.',
    },
    minute: {
      type: 'number',
      value: 0,
      help: 'The amount of HTTP requests the developer can make per minute. At least one limit must exist.',
    },
    hour: {
      type: 'number',
      value: 0,
      help: 'The amount of HTTP requests the developer can make per hour. At least one limit must exist.',
    },
    day: {
      type: 'number',
      value: 0,
      help: 'The amount of HTTP requests the developer can make per day. At least one limit must exist.',
    },
    month: {
      type: 'number',
      value: 0,
      help: 'The amount of HTTP requests the developer can make per month. At least one limit must exist.',
    },
    year: {
      type: 'number',
      value: 0,
      help: 'The amount of HTTP requests the developer can make per year. At least one limit must exist.',
    },
    limit_by: {
      type: 'select',
      options: ['consumer', 'credential', 'ip'],
      value: 'consumer',
      help: 'The entity that will be used when aggregating the limits: consumer, credential, ip. If the consumer or the credential cannot be determined, the system will always fallback to ip.',
    },
    policy: {
      type: 'select',
      options: ['local', 'cluster', 'redis'],
      value: 'cluster',
      help: 'The rate-limiting policies to use for retrieving and incrementing the limits. Available values are local (counters will be stored locally in-memory on the node), cluster (counters are stored in the datastore and shared across the nodes) and redis (counters are stored on a Redis server and will be shared across the nodes).',
    },
    fault_tolerant: {
      type: 'boolean',
      value: true,
      help: 'A boolean value that determines if the requests should be proxied even if Kong has troubles connecting a third-party datastore. If true requests will be proxied anyways effectively disabling the rate-limiting function until the datastore is working again. If false then the clients will see 500 errors.',
    },
    redis_host: {
      type: 'text',
      value: '',
      help: 'When using the redis policy, this property specifies the address to the Redis server.',
    },
    redis_port: {
      type: 'number',
      value: 6379,
      help: 'When using the redis policy, this property specifies the port of the Redis server. By default is 6379.',
    },
    redis_timeout: {
      type: 'number',
      value: 200,
      help: 'When using the redis policy, this property specifies the timeout in milliseconds of any command submitted to the Redis server.',
    },
  },
  'request-transformer': {
    meta: {
      description:
        'Transform the request sent by a client on the fly on Kong, before hitting the upstream server.',
    },
    http_method: {
      help: 'Changes the HTTP method for the upstream request.',
    },
    remove: {
      headers: {
        help: 'List of header names. Unset the headers with the given name.',
      },
      querystring: {
        help: 'List of querystring names. Remove the querystring if it is present.',
      },
      body: {
        help: 'List of parameter names. Remove the parameter if and only if content-type is one the following [application/json, multipart/form-data, application/x-www-form-urlencoded] and parameter is present.',
      },
    },
    replace: {
      headers: {
        help: 'List of headername:value pairs. If and only if the header is already set, replace its old value with the new one. Ignored if the header is not already set.',
      },
      querystring: {
        help: 'List of queryname:value pairs. If and only if the header is already set, replace its old value with the new one. Ignored if the header is not already set.',
      },
      body: {
        help: 'List of paramname:value pairs. If and only if content-type is one the following [application/json, multipart/form-data, application/x-www-form-urlencoded] and the parameter is already present, replace its old value with the new one. Ignored if the parameter is not already present.',
      },
    },
    add: {
      headers: {
        help: 'List of headername:value pairs. If and only if the header is not already set, set a new header with the given value. Ignored if the header is already set.',
      },
      querystring: {
        help: 'List of queryname:value pairs. If and only if the querystring is not already set, set a new querystring with the given value. Ignored if the header is already set.',
      },
      body: {
        help: 'List of pramname:value pairs. If and only if content-type is one the following [application/json, multipart/form-data, application/x-www-form-urlencoded] and the parameter is not present, add a new parameter with the given value to form-encoded body. Ignored if the parameter is already present.',
      },
    },
    append: {
      headers: {
        help: 'List of headername:value pairs. If the header is not set, set it with the given value. If it is already set, a new header with the same name and the new value will be set.',
      },
      querystring: {
        help: 'List of queryname:value pairs. If the querystring is not set, set it with the given value. If it is already set, a new querystring with the same name and the new value will be set.',
      },
      body: {
        help: 'List of paramname:value pairs. If the content-type is one the following [application/json, application/x-www-form-urlencoded], add a new parameter with the given value if the parameter is not present, otherwise if it is already present, the two values (old and new) will be aggregated in an array.',
      },
    },
    rename: {
      headers: {
        help: 'List of headername:value pairs. If and only if the header is already set, rename the header. The value is unchanged. Ignored if the header is not already set.',
      },
      querystring: {
        help: 'List of queryname:value pairs. If and only if the field name is already set, rename the field name. The value is unchanged. Ignored if the field name is not already set.',
      },
      body: {
        help: 'List of parameter name:value pairs. Rename the parameter name if and only if content-type is one the following [application/json, multipart/form-data, application/x-www-form-urlencoded] and parameter is present.',
      },
    },
  },

  'response-transformer': {
    meta: {
      description:
        'Transform the response sent by the upstream server on the fly on Kong, before returning the response to the client.',
    },
    remove: {
      headers: {
        help: 'List of header names. Unset the header(s) with the given name.',
      },
      json: {
        help: 'List of property names. Remove the property from the JSON body if it is present.',
      },
    },
    replace: {
      headers: {
        help: 'List of headername:value pairs. If and only if the header is already set, replace its old value with the new one. Ignored if the header is not already set.',
      },
      json: {
        help: 'List of property:value pairs. If and only if the parameter is already present, replace its old value with the new one. Ignored if the parameter is not already present.',
      },
    },
    add: {
      headers: {
        help: 'List of headername:value pairs. If and only if the header is not already set, set a new header with the given value. Ignored if the header is already set.',
      },
      json: {
        help: 'List of property:value pairs. If and only if the property is not present, add a new property with the given value to the JSON body. Ignored if the property is already present.',
      },
    },
    append: {
      headers: {
        help: 'List of headername:value pairs. If the header is not set, set it with the given value. If it is already set, a new header with the same name and the new value will be set.',
      },
      json: {
        help: 'List of property:value pairs. If the property is not present in the JSON body, add it with the given value. If it is already present, the two values (old and new) will be aggregated in an array.',
      },
    },
  },
};
