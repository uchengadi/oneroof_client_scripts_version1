/*
 * File: app/controller/ProductTypeController.js
 *
 * This file was generated by Sencha Architect version 3.0.4.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('cobuy.controller.ProductTypeController', {
    extend: 'Ext.app.Controller',

    models: [
        'ProductType'
    ],
    stores: [
        'ProductTypes'
    ],
    views: [
        'ProducttypeMainpanel',
        'ProducttypeGridpanel',
        'ProductTypeForm',
        'AddNewProductTypeWin',
        'EditProductTypeWin'
    ],

    refs: [
        {
            ref: 'allProductTypeGrid',
            selector: 'producttypemainpanel grid'
        }
    ],

    onAddNewProductTypeButtonClick: function(button, e, eOpts) {
        var win = Ext.create('cobuy.view.AddNewProductTypeWin');

        //load the category for all services

        win.down('#thiscategoryCombo').getStore().load({
            params:{
                service_id:0
            }
        });

        win.show();
    },

    onEditProductTypeButtonClick: function(button, e, eOpts) {
        var grid = this.getAllProductTypeGrid(),
        		record = grid.getSelectionModel().getSelection();

        		if(record[0]) {
        			var editWin = Ext.create('cobuy.view.EditProductTypeWin');
        			var form = editWin.down('form');

                    Ext.Ajax.request({

        				 url: '/cobuy/index.php?r=ProductType/obtainProductTypeExtraInformation',
        			     params: {
        					id: record[0].get('id'),
                             category_id:record[0].get('category_id')
        				},
                     //success or failure
        				success: function(response){
        				var jsonResponse = Ext.decode(response.responseText);
        					if (jsonResponse.success) {

        					 var category = jsonResponse.category;
                                var service_id = jsonResponse.service_id;

                                console.log('this service iddd is:',service_id);

                                if(record[0].get('is_paas') ==1){
                                    var decision = 'is_paas';
                                }else if(record[0].get('is_faas') ==1){
                                   var decision = 'is_faas';
                                }





        					}

        					var values = {
        						//grouptype_id: grouptype_name,
        						name: record[0].get('name'),
        						description: record[0].get('description'),
        						icon: record[0].get('icon'),
                                category:category,
                                category_id:record[0].get('category_id'),
                                service:service_id,
                                service_id:service_id,
                                decision:decision



        					};


        					form.loadRecord(record[0]);

        					form.getForm().setValues(values);

                            //load the category store
                            editWin.down('#thiscategoryCombo').getStore().load({
                                params:{
                                    service_id:service_id
                                }
                            });




        				}




        			});


        			editWin.show();
        		} else {
        				Ext.Msg.alert('Error!', 'Please Select a Product Type to edit');
        		}
    },

    onDeleteProductTypeButtonClick: function(button, e, eOpts) {
        var grid = this.getAllProductTypeGrid();
        		var record= grid.getSelectionModel().getSelection();

        if(record[0]){


        	Ext.Msg.show({
                         title:'Delete?',
                         msg: 'Are you sure you want to delete this Product Type?',
                         buttons: Ext.Msg.YESNO,
                         icon: Ext.Msg.QUESTION,
                         fn: function (buttonId){
                            if (buttonId == 'yes'){
                                Ext.Ajax.request({
                                    url: '/cobuy/index.php?r=ProductType/DeleteThisProducttype',
                                    params: {
                                        id: record[0].get('id')

                                    },
                                    success: function(conn, response, options, eOpts) {

                                        var result = Ext.JSON.decode(conn.responseText);

                                        if (result.success) {

                                            Ext.Msg.alert('Success!', result.msg);
                                            grid.getStore().load();

                                        } else {
                                            var error = Ext.JSON.decode(conn.responseText);
                                            Ext.Msg.alert('Error', error.msg);
                                        }
                                    },
                                    failure: function(conn, response, options, eOpts) {

                                        Ext.Msg.alert('Failure', 'Communication Error');
                                    }
                                });
                            }
                         }
                    });

        }else {
        				Ext.Msg.alert('Error!', 'Please Select a Product Type to delete');
        		}

    },

    onSaveNewProductTypeButtonClick: function(button, e, eOpts) {
        var win = button.up('window'),
        			formPanel = win.down('form'),
        			store = this.getAllProductTypeGrid().getStore();

        			if(formPanel.getForm().isValid()){
        				formPanel.getForm().submit({
        					clientValidation: true,
        					url: '/cobuy/index.php?r=ProductType/createnewproducttype',
                           //success or failure
        					success: function(form, action) {
        						var result = action.result;
        						if(result.success) {
        							Ext.Msg.alert('Success!', result.msg);
                                    //Ext.Msg.alert('Success!', 'New  Group Information Saved.');
        							//store.load();
        							store.load();

        							win.close();
        						} else {
        							Ext.Msg.alert(result.msg);
        						}
        					},
        					failure: function(form, action) {
        						var result = action.result;
                                switch(action.failureType) {
        							case Ext.form.action.Action.CLIENT_INVALID:
        							Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
        							break;
        							case Ext.form.action.Action.CONNECT_FAILURE:
        							Ext.Msg.alert('Failure', 'Ajax communication failed');
        							break;
        							case Ext.form.action.Action.SERVER_INVALID:
        								Ext.Msg.alert('Failure', result.msg);
        						}
        					}
        				});
        			}
    },

    onSaveEdittedProductTypeButtonClick: function(button, e, eOpts) {
        var win = button.up('window'),
        			formPanel = win.down('form'),
        			store = this.getAllProductTypeGrid().getStore();

        			if(formPanel.getForm().isValid()){
        				formPanel.getForm().submit({
        					clientValidation: true,
        					url: '/cobuy/index.php?r=ProductType/updateproducttype',
                           //success or failure
        					success: function(form, action) {
        						var result = action.result;
        						if(result.success) {
        							Ext.Msg.alert('Success!', result.msg);
                                    //Ext.Msg.alert('Success!', 'New  Group Information Saved.');
        							//store.load();
        							store.load();

        							win.close();
        						} else {
        							Ext.Msg.alert(result.msg);
        						}
        					},
        					failure: function(form, action) {
        						var result = action.result;
                                switch(action.failureType) {
        							case Ext.form.action.Action.CLIENT_INVALID:
        							Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
        							break;
        							case Ext.form.action.Action.CONNECT_FAILURE:
        							Ext.Msg.alert('Failure', 'Ajax communication failed');
        							break;
        							case Ext.form.action.Action.SERVER_INVALID:
        								Ext.Msg.alert('Failure', result.msg);
        						}
        					}
        				});
        			}
    },

    onProductTypeGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
        this.onEditProductTypeButtonClick();
    },

    onProductTypePanelRender: function(component, eOpts) {
        component.down('grid').getStore().load();
    },

    onServiceComboboxSelect: function(combo, records, eOpts) {
        var service_id = combo.getValue();

        var win = combo.up('window');

        //clear the category combo

        win.down('#thiscategoryCombo').clearValue();

        //load the categories under this service

        win.down('#thiscategoryCombo').getStore().load({
            params:{
                service_id:service_id
            }
        });







    },

    onProductCategoryComboboxSelect: function(combo, records, eOpts) {
        /**
        var win = combo.up('window');

        var service_id = win.down('form').down('hiddenfield[name=service_id]').getValue();

        console.log('the service id is:',service_id);
        **/
    },

    onProductCategoryComboboxRender: function(component, eOpts) {
        var win = component.up('window');

        var service_id = win.down('#thisserviceCombo').getValue();

        //load the category

        component.getStore().load({
            params:{
                service_id:service_id
            }
        });
    },

    onPaasRadiofieldChange: function(field, newValue, oldValue, eOpts) {
        var win = field.up('window');

        if(newValue == 1 || newValue == true){

            win.down('#paasContainer').setDisabled(false);
        }else{
            win.down('#paasContainer').setDisabled(true);
        }
    },

    onFaasRadiofieldChange: function(field, newValue, oldValue, eOpts) {
        var win = field.up('window');

        if(newValue == 1 || newValue == true){

            win.down('#paasContainer').setDisabled(true);
        }else{
            win.down('#paasContainer').setDisabled(false);
        }
    },

    init: function(application) {
        this.control({
            "producttypemainpanel button#addBtn": {
                click: this.onAddNewProductTypeButtonClick
            },
            "producttypemainpanel button#editBtn": {
                click: this.onEditProductTypeButtonClick
            },
            "producttypemainpanel button#deleteBtn": {
                click: this.onDeleteProductTypeButtonClick
            },
            "addnewproducttypewin button#saveBtn": {
                click: this.onSaveNewProductTypeButtonClick
            },
            "editproducttypewin button#saveBtn": {
                click: this.onSaveEdittedProductTypeButtonClick
            },
            "producttypemainpanel grid": {
                itemdblclick: this.onProductTypeGridpanelItemDblClick
            },
            "producttypemainpanel": {
                render: this.onProductTypePanelRender
            },
            "combobox#thisserviceCombo": {
                select: this.onServiceComboboxSelect
            },
            "combobox#thiscategoryCombo": {
                select: this.onProductCategoryComboboxSelect,
                render: this.onProductCategoryComboboxRender
            },
            "radiofield#paasRadio": {
                change: this.onPaasRadiofieldChange
            },
            "radiofield#faasRadio": {
                change: this.onFaasRadiofieldChange
            }
        });
    }

});
