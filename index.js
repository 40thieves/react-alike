function createElement(type, attrs, children) {
  const node = document.createElement(type)
  setAttributes(node, attrs)
}

// DOM properties that should NOT have "px" added when numeric
const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i

function setAttributes(node, attrs) {
  each(attrs, (value, name) => {
    setAttribute(node, name, value)
  })
}

function setAttribute(node, name, value) {
  if (name === 'style') {
    if (!value || typeof value === 'string') {
      node.style.cssText = value || ''
    } else if (typeof value === 'object') {
      each(value, (styleValue, styleName) => {
        if (
          typeof styleValue === 'number' &&
          IS_NON_DIMENSIONAL.test(styleName) === false
        ) {
          styleValue = styleValue + 'px'
        }
        node.style[styleName] = styleValue
      })
    }
  } else if (name !== 'list' && name !== 'type' && name in node) {
    setProperty(node, name, value == null ? '' : value)
  } else {
    if (typeof value !== 'function') {
      node.setAttribute(name, value)
    }
  }
}

function setProperty(node, name, value) {
  // Attempt to set a DOM property to the given value.
  // IE & FF throw for certain property - value combinations
  try {
    node[name] = value;
  } catch (e) {}
}


function each(obj, cb) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cb(obj[key], key)
    }
  }
}