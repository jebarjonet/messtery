Template.addCategoriesPlaces.onCreated(function() {
    this.subscribe('places');
});

Template.addCategoriesPlaces.helpers({
    category: function () {
        return {
            color: AutoForm.getFieldValue('color', 'insertPlacesCategoriesForm'),
            icon: AutoForm.getFieldValue('icon', 'insertPlacesCategoriesForm')
        };
    }
});

AutoForm.addHooks('insertPlacesCategoriesForm', {
    onSuccess: function () {
        notification('Category added to list', 'success');
        FlowRouter.go('places.categories');
    }
});