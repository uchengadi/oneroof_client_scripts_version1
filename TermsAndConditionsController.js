/*
 * File: app/controller/TermsAndConditionsController.js
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

Ext.define('cobuy.controller.TermsAndConditionsController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'allTermsAndConditionsGrid',
            selector: 'termsandconditionsmainpanel grid'
        }
    ],

    onAddNewTermsAndConditionButtonClick: function(button, e, eOpts) {
        var win = Ext.create('cobuy.view.TermsAndConditionsWindow');

        win.show();
    },

    onEditTermsAndConditionsButtonClick: function(button, e, eOpts) {
        var grid = this.getAllTermsAndConditionsGrid(),
        		record = grid.getSelectionModel().getSelection();

        		if(record[0]) {
        			var editWin = Ext.create('cobuy.view.EditTermsAndConditionsWin');
        			editWin.down('form').loadRecord(record[0]);
        			editWin.show();
        		} else {
        				Ext.Msg.alert('Error', 'Please Select the terms & conditions content to edit');
        		}
    },

    onDeleteTermsAndConditionsButtonClick: function(button, e, eOpts) {
        var grid = this.getAllTermsAndConditionsGrid();
        		var record= grid.getSelectionModel().getSelection();

        if(record[0]){


        	Ext.Msg.show({
                         title:'Delete?',
                         msg: 'Are you sure you want to delete this terms & conditions content?',
                         buttons: Ext.Msg.YESNO,
                         icon: Ext.Msg.QUESTION,
                         fn: function (buttonId){
                            if (buttonId == 'yes'){
                                Ext.Ajax.request({
                                    url: '/cobuy/index.php?r=TermsAndConditions/DeleteThisTermAndConditionContent',
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
        				Ext.Msg.alert('Error', 'Please Select the Term & Condition Content to delete');
        		}

    },

    onTermsAndConditionsGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var grid = this.getAllTermsAndConditionsGrid(),
        		record = grid.getSelectionModel().getSelection();

        		if(record[0]) {
        			var editWin = Ext.create('cobuy.view.EditTermsAndConditionsWin');
        			editWin.down('form').loadRecord(record[0]);
        			editWin.show();
        		} else {
        				Ext.Msg.alert('Error', 'Please Select the terms & conditions content to edit');
        		}
    },

    onSaveNewTermsAndConditionsButtonClick: function(button, e, eOpts) {
        var win = button.up('window'),
        			formPanel = win.down('form'),
        			store = this.getAllTermsAndConditionsGrid().getStore();

        			if(formPanel.getForm().isValid()){
        				formPanel.getForm().submit({
        					clientValidation: true,
        					url: '/cobuy/index.php?r=TermsAndConditions/addNewTermsAndConditionsContent',
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

    onSaveEdittedTermsAndConditionsButtonClick: function(button, e, eOpts) {
        var win = button.up('window'),
        			formPanel = win.down('form'),
        			store = this.getAllTermsAndConditionsGrid().getStore();

        			if(formPanel.getForm().isValid()){
        				formPanel.getForm().submit({
        					clientValidation: true,
        					url: '/cobuy/index.php?r=TermsAndConditions/updateTermsAndConditionsContent',
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

    init: function(application) {
        this.control({
            "termsandconditionsmainpanel button#addBtn": {
                click: this.onAddNewTermsAndConditionButtonClick
            },
            "termsandconditionsmainpanel button#editBtn": {
                click: this.onEditTermsAndConditionsButtonClick
            },
            "termsandconditionsmainpanel button#deleteBtn": {
                click: this.onDeleteTermsAndConditionsButtonClick
            },
            "termsandconditionsmainpanel grid": {
                itemdblclick: this.onTermsAndConditionsGridpanelItemDblClick
            },
            "termsandconditionswindow button#saveBtn": {
                click: this.onSaveNewTermsAndConditionsButtonClick
            },
            "edittermsandconditionswin button#saveBtn": {
                click: this.onSaveEdittedTermsAndConditionsButtonClick
            }
        });
    }

});
