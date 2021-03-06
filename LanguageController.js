/*
 * File: app/controller/LanguageController.js
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

Ext.define('cobuy.controller.LanguageController', {
    extend: 'Ext.app.Controller',

    models: [
        'Language'
    ],
    stores: [
        'Languages'
    ],
    views: [
        'LanguageGridpanel',
        'LanguagesMainpanel',
        'NewLanguageWin',
        'EditLanguageWin'
    ],

    refs: [
        {
            ref: 'allLanguagesGrid',
            selector: 'languagesmainpanel grid'
        }
    ],

    onAddLanguageButtonClick: function(button, e, eOpts) {
        var win = Ext.create('cobuy.view.NewLanguageWin');

        win.show();
    },

    onEditLanguageButtonClick: function(button, e, eOpts) {
        var grid = this.getAllLanguagesGrid(),
        		record = grid.getSelectionModel().getSelection();

        		if(record[0]) {
        			var editWin = Ext.create('cobuy.view.EditLanguageWin');
        			var form = editWin.down('form');
        			//var grouptype_id = record[0].get('grouptype_id');

        			Ext.Ajax.request({

        				 url: '/cobuy/index.php?r=Languages/ListLanguageDetails',
        			     params: {
        					id: record[0].get('id')
        				},
                     //success or failure
        				success: function(response){
        				var jsonResponse = Ext.decode(response.responseText);
        					if (jsonResponse.success) {

        					//var grouptype_name = jsonResponse.grouptype[0].name;



        					}

        					var values = {
        						//grouptype_id: grouptype_name,
        						name: record[0].get('name'),
        						description: record[0].get('description'),
        						icon: record[0].get('icon')


        					};


        					form.loadRecord(record[0]);

        					form.getForm().setValues(values);


        				}




        			});


        			editWin.show();
        		} else {
        				Ext.Msg.alert('Error!', 'Please Select a Language to edit');
        		}
    },

    onDeleteLanguageButtonClick: function(button, e, eOpts) {
        var grid = this.getAllLanguagesGrid();
        		var record= grid.getSelectionModel().getSelection();

        if(record[0]){


        	Ext.Msg.show({
                         title:'Delete?',
                         msg: 'Are you sure you want to delete this Language?',
                         buttons: Ext.Msg.YESNO,
                         icon: Ext.Msg.QUESTION,
                         fn: function (buttonId){
                            if (buttonId == 'yes'){
                                Ext.Ajax.request({
                                    url: '/cobuy/index.php?r=Languages/DeleteThisLanguage',
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
        				Ext.Msg.alert('Error!', 'Please Select a Language to delete');
        		}

    },

    onSaveNewLanguageButtonClick: function(button, e, eOpts) {
        var win = button.up('window'),
        			formPanel = win.down('form'),
        			store = this.getAllLanguagesGrid().getStore();

        			if(formPanel.getForm().isValid()){
        				formPanel.getForm().submit({
        					clientValidation: true,
        					url: '/cobuy/index.php?r=Languages/addnewlangugae',
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

    onSaveEdittedLanguageButtonClick: function(button, e, eOpts) {
        var win = button.up('window'),
        			formPanel = win.down('form'),
        			store = this.getAllLanguagesGrid().getStore();

        			if(formPanel.getForm().isValid()){
        				formPanel.getForm().submit({
        					clientValidation: true,
        					url: '/cobuy/index.php?r=Languages/updatelangugae',
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

    onLanguageGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
        this.onEditLanguageButtonClick();
    },

    onLanguagePanelRender: function(component, eOpts) {
        component.down('grid').getStore().load();
    },

    init: function(application) {
        this.control({
            "languagesmainpanel button#addBtn": {
                click: this.onAddLanguageButtonClick
            },
            "languagesmainpanel button#editBtn": {
                click: this.onEditLanguageButtonClick
            },
            "languagesmainpanel button#deleteBtn": {
                click: this.onDeleteLanguageButtonClick
            },
            "newlanguagewin button#addBtn": {
                click: this.onSaveNewLanguageButtonClick
            },
            "editlanguagewin button#addBtn": {
                click: this.onSaveEdittedLanguageButtonClick
            },
            "languagesmainpanel grid": {
                itemdblclick: this.onLanguageGridpanelItemDblClick
            },
            "languagesmainpanel": {
                render: this.onLanguagePanelRender
            }
        });
    }

});
