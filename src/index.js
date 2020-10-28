const serializeObject = form => {
  let data = {};
  Array.prototype.slice.call(form.elements).forEach(field => {
    if (!field.name || field.name.includes('__') || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;
    if (field.type === 'select-multiple') {
      Array.prototype.slice.call(field.options).forEach(option => {
        if (!option.selected) return;
        data[field.name] = option.value;
      });
      return;
    }
    if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return;
    data[field.name] = field.value;

  });
  return data;
}

const serializeFormData = form => {
  const formData = new FormData();
  
  const object = serializeObject(form)
  for (var property in object) {
    formData.append(property, object[property])
  }
  
  Array.prototype.slice.call(form.elements).forEach(field => {
    if (!field.name || field.type !== 'file') return
    if (field.files[0])
      formData.append(field.name, field.files[0])
  })

  return formData
}

export {
  serializeObject,
  serializeFormData
}