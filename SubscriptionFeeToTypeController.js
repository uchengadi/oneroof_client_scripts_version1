/*
 * File: app/controller/SubscriptionFeeToTypeController.js
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

Ext.define('cobuy.controller.SubscriptionFeeToTypeController', {
    extend: 'Ext.app.Controller',

    models: [
        'MembershiptypeHasFees'
    ],
    stores: [
        'MembershiptypeHasFees'
    ],
    views: [
        'AssignMembershipSubscriptionToFeesMainpanel',
        'AssignFeesToMembershipTypeWin',
        'ModifyAssignedFeeToMembershipTypeWin'
    ],

    refs: [
        {
            ref: 'allAssignedFeesToMembershipType',
            selector: 'assignmembershipsubscriptiontofeesmainpanel grid'
        }
    ],

    onAssignFeeToMembershipTypeButtonClick: function(button, e, eOpts) {
        var win = Ext.create('cobuy.view.AssignFeesToMembershipTypeWin');

        win.show();
    },

    onSaveAssignedFeeToMembershiptypeButtonClick: function(button, e, eOpts) {
        var win = button.up('window'),
        			formPanel = win.down('form'),
        			store = this.getAllAssignedFeesToMembershipType().getStore();

        			if(formPanel.getForm().isValid()){
        				formPanel.getForm().submit({
        					clientValidation: true,
        					url: '/cobuy/index.php?r=MembershipFee/AssignFeeToMembershiptype',
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

    onModifyTheAssignedFeeToMembershiptypeButtonClick: function(button, e, eOpts) {
        var grid = this.getAllAssignedFeesToMembershipType(),
        		record = grid.getSelectionModel().getSelection();

        		if(record[0]) {
        			var editWin = Ext.create('cobuy.view.ModifyAssignedFeeToMembershipTypeWin');
        			var form = editWin.down('form');


        			Ext.Ajax.request({

        				 url: '/cobuy/index.php?r=MembershipFee/obtainMembershiptypeToFeeExtraInformation',
        			     params: {
                            fee_id: record[0].get('fee_id'),
                            membership_type_id: record[0].get('membership_type_id')
        				},
                     //success or failure
        				success: function(response){
        				var jsonResponse = Ext.decode(response.responseText);
        					if (jsonResponse.success) {

                                var monthly_fee = jsonResponse.monthly_fee;
                                var yearly_fee = jsonResponse.yearly_fee;
                                var membership_type = jsonResponse.membertype;


        					}

        					var values = {

        						monthly_fee: monthly_fee,
                                yearly_fee:yearly_fee,
        						membertype: membership_type,
                                assignment_status:record[0].get('status')


        					};


        					form.loadRecord(record[0]);

        					form.getForm().setValues(values);


        				}




        			});


        			editWin.show();
        		} else {
        				Ext.Msg.alert('Error!', 'Please Select a Membership fee to assign to membership type');
        		}
    },

    onSaveModifiedFeeAssignedToMembershiptypeButtonClick: function(button, e, eOpts) {
        var win = button.up('window'),
        			formPanel = win.down('form'),
        			store = this.getAllAssignedFeesToMembershipType().getStore();

        			if(formPanel.getForm().isValid()){
        				formPanel.getForm().submit({
        					clientValidation: true,
        					url: '/cobuy/index.php?r=MembershipFee/modifyAssignFeeToMembershiptype',
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

    onFeesAssignedToMembershiptypeGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
        this.onModifyTheAssignedFeeToMembershiptypeButtonClick();
    },

    onAssignMembershipSubscriptionPanelRender: function(component, eOpts) {
        component.down('grid').getStore().load();
    },

    onFeeDeactivationRadiofieldChange: function(field, newValue, oldValue, eOpts) {
        var win = field.up('window');

        if(newValue == 1 || newValue == true){
            win.down('#deactivatefeeBtn').setVisible(true);
            win.down('#activatefeeBtn').setVisible(false);
        }
    },

    onFeeActivationRadiofieldChange: function(field, newValue, oldValue, eOpts) {
        var win = field.up('window');

        if(newValue == 1 || newValue == true){
            win.down('#deactivatefeeBtn').setVisible(false);
            win.down('#activatefeeBtn').setVisible(true);
        }
    },

    onDeactivatingFeeAssignedToATypeButtonClick: function(button, e, eOpts) {
        var win = button.up('window'),
        			formPanel = win.down('form'),
        			store = this.getAllAssignedFeesToMembershipType().getStore();

        			if(formPanel.getForm().isValid()){
        				formPanel.getForm().submit({
        					clientValidation: true,
        					url: '/cobuy/index.php?r=MembershipFee/deactivateFeeToMembershiptype',
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

    onModifyAssignedFeeWindowRender: function(component, eOpts) {
        var status = component.down('form').down('hiddenfield[name=assignment_status]').getValue();

        if(status =='active'){
            component.down('#activatefeeBtn').setVisible(true);
            component.down('#deactivatefeeBtn').setVisible(false);
        }else{
            component.down('#activatefeeBtn').setVisible(false);
            component.down('#deactivatefeeBtn').setVisible(true);
        }
    },

    init: function(application) {
        this.control({
            "assignmembershipsubscriptiontofeesmainpanel button#assignBtn": {
                click: this.onAssignFeeToMembershipTypeButtonClick
            },
            "assignfeestomembershiptypewin button#assignBtn": {
                click: this.onSaveAssignedFeeToMembershiptypeButtonClick
            },
            "assignmembershipsubscriptiontofeesmainpanel button#modifyBtn": {
                click: this.onModifyTheAssignedFeeToMembershiptypeButtonClick
            },
            "modifyassignedfeetomembershiptypewin button#activatefeeBtn": {
                click: this.onSaveModifiedFeeAssignedToMembershiptypeButtonClick
            },
            "assignmembershipsubscriptiontofeesmainpanel grid": {
                itemdblclick: this.onFeesAssignedToMembershiptypeGridpanelItemDblClick
            },
            "assignmembershipsubscriptiontofeesmainpanel ": {
                render: this.onAssignMembershipSubscriptionPanelRender
            },
            "radiofield#deactivateFeeRadio": {
                change: this.onFeeDeactivationRadiofieldChange
            },
            "radiofield#activateFeeRadio": {
                change: this.onFeeActivationRadiofieldChange
            },
            "modifyassignedfeetomembershiptypewin button#deactivatefeeBtn": {
                click: this.onDeactivatingFeeAssignedToATypeButtonClick
            },
            " modifyassignedfeetomembershiptypewin": {
                render: this.onModifyAssignedFeeWindowRender
            }
        });
    }

});
