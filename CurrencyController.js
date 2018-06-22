/*
 * File: app/controller/CurrencyController.js
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

Ext.define('cobuy.controller.CurrencyController', {
    extend: 'Ext.app.Controller',

    models: [
        'Currency'
    ],
    stores: [
        'Currencies'
    ],
    views: [
        'CurrencyGridpanel',
        'CurrencyMainpanel',
        'NewCurrencyWin',
        'EditCurrencyWin'
    ],

    refs: [
        {
            ref: 'allCurrenciesGrid',
            selector: 'currencymainpanel grid'
        }
    ],

    onAddNewCurrencyButtonClick: function(button, e, eOpts) {
        var win = Ext.create('cobuy.view.NewCurrencyWin');

        win.show();
    },

    onEditCurrencyButtonClick: function(button, e, eOpts) {
        var grid = this.getAllCurrenciesGrid(),
        		record = grid.getSelectionModel().getSelection();

        		if(record[0]) {
        			var editWin = Ext.create('cobuy.view.EditCurrencyWin');
        			var form = editWin.down('form');
        			//var grouptype_id = record[0].get('grouptype_id');

        			Ext.Ajax.request({

        				 url: '/cobuy/index.php?r=Currencies/RetrieveThisCurrencyCountry',
        			     params: {
        					country_id: record[0].get('country_id')
        				},
                     //success or failure
        				success: function(response){
        				var jsonResponse = Ext.decode(response.responseText);
        					if (jsonResponse.success) {

        					var country = jsonResponse.country;



        					}

        					var values = {
                                country:country

        					};


        					form.loadRecord(record[0]);

        					form.getForm().setValues(values);


        				}




        			});


        			editWin.show();
        		} else {
        				Ext.Msg.alert('Error!', 'Please Select a Currency to edit');
        		}
    },

    onDeleteCurrencyButtonClick: function(button, e, eOpts) {
        var grid = this.getAllCurrenciesGrid();
        		var record= grid.getSelectionModel().getSelection();

        if(record[0]){


        	Ext.Msg.show({
                         title:'Delete?',
                         msg: 'Are you sure you want to delete this Currency?',
                         buttons: Ext.Msg.YESNO,
                         icon: Ext.Msg.QUESTION,
                         fn: function (buttonId){
                            if (buttonId == 'yes'){
                                Ext.Ajax.request({
                                    url: '/cobuy/index.php?r=Currencies/DeleteThisCurrency',
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
        				Ext.Msg.alert('Error!', 'Please Select a Currency to delete');
        		}

    },

    onSaveNewCurrencyButtonClick: function(button, e, eOpts) {
        var win = button.up('window'),
        			formPanel = win.down('form'),
        			store = this.getAllCurrenciesGrid().getStore();

        			if(formPanel.getForm().isValid()){
        				formPanel.getForm().submit({
        					clientValidation: true,
        					url: '/cobuy/index.php?r=Currencies/addnewcurrency',
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

    onSaveEdittedCurrencyButtonClick: function(button, e, eOpts) {
        var win = button.up('window'),
        			formPanel = win.down('form'),
        			store = this.getAllCurrenciesGrid().getStore();

        			if(formPanel.getForm().isValid()){
        				formPanel.getForm().submit({
        					clientValidation: true,
        					url: '/cobuy/index.php?r=Currencies/updatecurrency',
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

    onCurrencyMainpanelGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
        this.onEditCurrencyButtonClick();
    },

    onCurrencyPanelRender: function(component, eOpts) {
        component.down('grid').getStore().load();
    },

    init: function(application) {
        this.control({
            "currencymainpanel button#addBtn": {
                click: this.onAddNewCurrencyButtonClick
            },
            "currencymainpanel button#editBtn": {
                click: this.onEditCurrencyButtonClick
            },
            "currencymainpanel button#deleteBtn": {
                click: this.onDeleteCurrencyButtonClick
            },
            "newcurrencywin button#addBtn": {
                click: this.onSaveNewCurrencyButtonClick
            },
            "editcurrencywin button#addBtn": {
                click: this.onSaveEdittedCurrencyButtonClick
            },
            "currencymainpanel grid": {
                itemdblclick: this.onCurrencyMainpanelGridpanelItemDblClick
            },
            "currencymainpanel": {
                render: this.onCurrencyPanelRender
            }
        });
    }

});
