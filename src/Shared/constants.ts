import { keyValueType } from '../interfaces';

export const BASE_API_URL: string =
  process.env.API_URL || 'http://localhost:8001';

export const AUTH_API_URL = 'http://localhost:9090';

export const ROUTE_TEXT_FIELDS: keyValueType[] = [
  { key: 'name', value: 'The name of the Route.', type: 'text', option: [] },

  {
    key: 'tags',
    value: 'Optionally add tags to the route',
    type: 'list',
    option: [],
  },

  {
    key: 'hosts',
    value:
      'A list of domain names that match this Route. For example: example.com. At least one of hosts, paths, or methods must be set.',
    type: 'list',
    option: [],
  },

  {
    key: 'paths',
    value:
      'A list of paths that match this Route. For example: /my-path. At least one of hosts, paths, or methods must be set.',
    type: 'list',
    option: [],
  },

  {
    key: 'headers',
    value:
      'One or more lists of values indexed by header name that will cause this Route to match if present in the request. The Host header cannot be used with this attribute: hosts should be specified using the hosts attribute.Field values format example: x-some-header:foo,bar',
    type: 'list',
    option: [],
  },

  {
    key: 'path_handling',
    value:
      'Controls how the Service path, Route path and requested path are combined when sending a request to the upstream. See above for a detailed description of each behavior. Accepted values are: "v0", "v1". Defaults to "v1".',
    type: 'dropdown',
    option: ['v0', 'v1'],
  },

  {
    key: 'https_redirect_status_code',
    value:
      'The status code Kong responds with when all properties of a Route match except the protocol, i.e. if the protocol of the request is HTTP instead of HTTPS. Location header is injected by Kong if the field is set to 301, 302, 307 or 308. Defaults to 426.',
    type: 'number',
    option: [],
  },

  {
    key: 'regex_priority',
    value:
      'A number used to choose which route resolves a given request when several routes match it using regexes simultaneously. When two routes match the path and have the same regex_priority, the older one (lowest created_at) is used. Note that the priority for non-regex routes is different (longer non-regex routes are matched before shorter ones). Defaults to 0.',
    type: 'number',
    option: [],
  },
  {
    key: 'methods',
    value:
      'A list of HTTP methods that match this Route. At least one of hosts, paths, or methods must be set.',
    type: 'list',
    option: [],
  },
  {
    key: 'strip_path',
    value:
      'When matching a Route via one of the paths, strip the matching prefix from the upstream request URL.',
    type: 'checkbox',
    option: [],
  },
  {
    key: 'preserve_host',
    value:
      'When matching a Route via one of the paths, strip the matching prefix from the upstream request URL.',
    type: 'checkbox',
    option: [],
  },
  {
    key: 'protocols',
    value:
      'A list of the protocols this Route should allow. By default it is ["http", "https"], which means that the Route accepts both. When set to ["https"], HTTP requests are answered with a request to upgrade to HTTPS.',
    type: 'list',
    option: [],
  },
  {
    key: 'snis',
    value:
      'A list of SNIs that match this Route when using stream routing. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set.',
    type: 'list',
    option: [],
  },
  {
    key: 'sources',
    value:
      'A list of IP sources of incoming connections that match this Route when using stream routing. Each entry is an object with fields “ip” (optionally in CIDR range notation) and/or “port”. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set.The field expects values with ip:port format. ex: 192.168.1.2:3000.',
    type: 'list',
    option: [],
  },
  {
    key: 'destinations',
    value:
      'A list of IP destinations of incoming connections that match this Route when using stream routing. Each entry is an object with fields “ip” (optionally in CIDR range notation) and/or “port”. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set.The field expects values with ip:port format. ex: 192.168.1.2:3000',
    type: 'list',
    option: [],
  },
];

export const SERVICE_TEXT_FIELDS: keyValueType[] = [
  { key: 'name', value: 'The service name.', type: 'text', option: [] },
  {
    key: 'tags',
    value: 'Optionally add tags to the service',
    type: 'list',
    option: [],
  },
  {
    key: 'protocol',
    value:
      'The protocol used to communicate with the upstream. It can be one of http or https.',
    type: 'text',
    option: [],
  },

  {
    key: 'host',
    value: 'The host of the upstream server.',
    type: 'text',
    option: [],
  },
  {
    key: 'port',
    value: 'The upstream server port. Defaults to 80.',
    type: 'number',
    option: [],
  },

  {
    key: 'path',
    value:
      'The path to be used in requests to the upstream server. Empty by default.',
    type: 'text',
    option: [],
  },

  {
    key: 'retries',
    value:
      'The number of retries to execute upon failure to proxy. The default is 5.',
    type: 'number',
    option: [],
  },

  {
    key: 'connect_timeout',
    value:
      'The timeout in milliseconds for establishing a connection to your upstream server. Defaults to 60000',
    type: 'number',
    option: [],
  },

  {
    key: 'write_timeout',
    value:
      'The timeout in milliseconds between two successive write operations for transmitting a request to the upstream server. Defaults to 60000',
    type: 'number',
    option: [],
  },

  {
    key: 'read_timeout',
    value:
      'The timeout in milliseconds between two successive read operations for transmitting a request to the upstream server. Defaults to 60000',
    type: 'number',
    option: [],
  },
  {
    key: 'client_certificate',
    value:
      'Certificate (id) to be used as client certificate while TLS handshaking to the upstream server.',
    type: 'text',
    option: [],
  },
];

export const CONSUMER_TEXT_FIELDS: keyValueType[] = [
  {
    key: 'username',
    value:
      'The username of the consumer. You must send either this field or custom_id with the request.',
    type: 'text',
    option: [],
  },

  {
    key: 'custom_id',
    value:
      'Field for storing an existing ID for the consumer, useful for mapping Kong with users in your existing database. You must send either this field or username with the request.',
    type: 'text',
    option: [],
  },
  {
    key: 'tags',
    value: 'Optionally add tags to the consumer',
    type: 'list',
    option: [],
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
  modifiedExistingService: 'Successfully modified the service!',
  createdNewRoute: 'Successfully created the Route!',
  modifiedExistingRoute: 'Successfully modified the Route!',
  deletedService: 'Successfully deleted the Service',
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

export const addPlugins = {
  Authentication: [
    {
      header: 'Basic Auth',
      image: '/basic-auth.png',
      description: 'Add Basic Authentication to your APIs',
      toolTip: 'basic auth',
      scope: 'global',
    },
    {
      header: 'Key Auth',
      image: '/key-auth.png',
      description: 'Add a key authentication to your APIs',
      toolTip: 'key auth',
      scope: 'global',
    },
    {
      header: 'oauth2',
      image: '/oauth2.png',
      description: 'Add an OAuth 2.0 authentication to your APIs',
      toolTip: 'oauth2',
      scope: 'global',
    },
    {
      header: 'Hmac Auth',
      image: '/hmac-auth.png',
      description: 'Add HMAC Authentication to your APIs',
      toolTip: 'hmac auth',
      scope: 'global',
    },
    {
      header: 'Jwt',
      image: '/jwt.png',
      description: 'Verify and authenticate JSON Web Tokens',
      toolTip: 'jwt',
      scope: 'global',
    },
    {
      header: 'Ldap Auth',
      image: '/ldap-auth.png',
      description: 'Integrate Kong with a LDAP server',
      toolTip: 'ldap auth',
      scope: 'global',
    },
    {
      header: 'Session',
      image: '/session.png',
      description: 'Support sessions for Kong Authentication Plugins.',
      toolTip: 'session',
      scope: 'global',
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
