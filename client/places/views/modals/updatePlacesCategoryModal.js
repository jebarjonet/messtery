AutoForm.addHooks('updatePlacesCategoriesForm', {
    onSuccess: function () {
        notification('Category updated', 'success');
        Modal.hide();
    }
});

Template.updatePlacesCategoryModal.helpers({
    category: function () {
        return {
            color: AutoForm.getFieldValue('color', 'updatePlacesCategoriesForm'),
            icon: AutoForm.getFieldValue('icon', 'updatePlacesCategoriesForm')
        };
    }
});