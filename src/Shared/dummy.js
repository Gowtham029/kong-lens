const getKeys = (object) => {
  const final = [];
  const default_values = {};
  const toggle_values = [];
  Object.keys(object).forEach((key) => {
    const values = {
      key: '',
      option: [],
      help: '',
      type: '',
      between: [],
    };
    const valueKey = key.replaceAll('_', ' ');
    values.key = valueKey;
    if (object[key].type !== 'array') {
      values.option = object[key].elements ? object[key].elements.one_of : [];
    }
    values.option = object[key].one_of ? object[key].one_of : [];
    values.help = object[key].help;
    if (object[key].type === 'string')
      values.type = !object[key].one_of ? 'text' : 'dropdown';
    else if (object[key].type === 'set') values.type = 'list';
    else if (object[key].type === 'array') values.type = 'dropdown';
    else values.type = object[key].type;
    default_values[valueKey] = object[key].default ? object[key].default : '';
    if (object[key].type === 'boolean') toggle_values.push(valueKey);
    values.between = object[key].between ? object[key].between : [];
    final.push(values);
  });
  console.log(final);
  console.log(default_values);
  console.log(toggle_values);
};

getKeys({
  allow: {
    elements: {
      type: 'string',
    },
    type: 'array',
    help: '',
  },
  deny: {
    elements: {
      type: 'string',
    },
    type: 'array',
    help: '',
  },
  hide_groups_header: {
    type: 'boolean',
    default: false,
    required: true,
    value: false,
    help: '',
  },
});
