
export const displayValidationText = (field , messeges, validations ) => {
    if (validations.filter(f => f.field === field).length === 0)
        return '';
    const fieldValidations = validations.filter(f => f.field === field);
    let valMessage = '';
    fieldValidations.forEach(element => {
        valMessage += messeges[field + '_' + element.type.toLowerCase()];
        valMessage += '\n';
    });
    return valMessage;

};

export const STATUS = {
    init : 'init',
    loading:'loading',
    loaded:'loaded',
    saved:'saved',
    updated:'updated',
    deleted:'deleted',
    list: 'list',
    validate:'validate'
}