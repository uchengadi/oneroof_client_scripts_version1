/*
 * File: app/controller/AboutUsController.js
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

Ext.define('cobuy.controller.AboutUsController', {
    extend: 'Ext.app.Controller',

    models: [
        'AboutUs'
    ],
    stores: [
        'AboutUs'
    ],
    views: [
        'WebsiteAboutUsForm',
        'WebsiteAboutUsWin',
        'WebsiteAboutUsGridpanel',
        'WebsiteAboutUsMainpanel'
    ],

    refs: [
        {
            ref: 'allAboutUsInfoGrid',
            selector: 'websiteaboutusmainpanel grid'
        }
    ],

    onAddNewAboutUsContentButtonClick: function(button, e, eOpts) {
        var win = Ext.create('cobuy.view.WebsiteAboutUsWin');

        win.show();
    },

    onEditAboutUsContentButtonClick: function(button, e, eOpts) {
        var grid = this.getAllAboutUsInfoGrid(),
        		record = grid.getSelectionModel().getSelection();

        		if(record[0]) {
        			var editWin = Ext.create('cobuy.view.EditWebsiteAboutUsContentWin');
        			editWin.down('form').loadRecord(record[0]);
        			editWin.show();
        		} else {
        				Ext.Msg.alert('Error', 'Please Select an about us content to edit');
        		}
    },

    onDeleteAboutUsContentButtonClick: function(button, e, eOpts) {
        var grid = this.getAllAboutUsInfoGrid();
        		var record= grid.getSelectionModel().getSelection();

        if(record[0]){


        	Ext.Msg.show({
                         title:'Delete?',
                         msg: 'Are you sure you want to delete this About Us Content?',
                         buttons: Ext.Msg.YESNO,
                         icon: Ext.Msg.QUESTION,
                         fn: function (buttonId){
                            if (buttonId == 'yes'){
                                Ext.Ajax.request({
                                    url: '/cobuy/index.php?r=WebsiteAboutUs/DeleteThisAboutUsContent',
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
        				Ext.Msg.alert('Error', 'Please Select an About Us Content to delete');
        		}

    },

    onSaveAboutUsContentButtonClick: function(button, e, eOpts) {
        var win = button.up('window'),
        			formPanel = win.down('form'),
        			store = this.getAllAboutUsInfoGrid().getStore();

        			if(formPanel.getForm().isValid()){
        				formPanel.getForm().submit({
        					clientValidation: true,
        					url: '/cobuy/index.php?r=WebsiteAboutUs/AddNewAboutUsContent',
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

    onAboutUsGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var grid = this.getAllAboutUsInfoGrid(),
        		record = grid.getSelectionModel().getSelection();

        		if(record[0]) {
        			var editWin = Ext.create('cobuy.view.EditWebsiteAboutUsContentWin');
        			editWin.down('form').loadRecord(record[0]);
        			editWin.show();
        		} else {
        				Ext.Msg.alert('Error', 'Please Select an about us content to edit');
        		}
    },

    onSaveEdittedAboutUsContentButtonClick: function(button, e, eOpts) {
        var win = button.up('window'),
        			formPanel = win.down('form'),
        			store = this.getAllAboutUsInfoGrid().getStore();

        			if(formPanel.getForm().isValid()){
        				formPanel.getForm().submit({
        					clientValidation: true,
        					url: '/cobuy/index.php?r=WebsiteAboutUs/UpdateAboutUsContent',
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
            "websiteaboutusmainpanel button#addBtn": {
                click: this.onAddNewAboutUsContentButtonClick
            },
            "websiteaboutusmainpanel button#editBtn": {
                click: this.onEditAboutUsContentButtonClick
            },
            "websiteaboutusmainpanel button#deleteBtn": {
                click: this.onDeleteAboutUsContentButtonClick
            },
            "websiteaboutuswin button#saveBtn": {
                click: this.onSaveAboutUsContentButtonClick
            },
            "websiteaboutusmainpanel grid": {
                itemdblclick: this.onAboutUsGridpanelItemDblClick
            },
            "editwebsiteaboutuscontentwin button#saveBtn": {
                click: this.onSaveEdittedAboutUsContentButtonClick
            }
        });
    }

});
