/*
 * File: app/controller/FailedSubscriptionPaymentController.js
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

Ext.define('cobuy.controller.FailedSubscriptionPaymentController', {
    extend: 'Ext.app.Controller',

    models: [
        'SubscriptionPayment'
    ],
    stores: [
        'FailedSubscriptionPayment'
    ],
    views: [
        'FailedSubscriptionPaymentMainpanel',
        'ViewFailedSubscriptionPaymentWin'
    ],

    refs: [
        {
            ref: 'allFailedSubscriptionPaymentGrid',
            selector: 'failedsubscriptionpaymentmainpanel grid'
        }
    ],

    onViewFailedSubscriptionPaymentButtonClick: function(button, e, eOpts) {
        var grid = this.getAllFailedSubscriptionPaymentGrid(),
        		record = grid.getSelectionModel().getSelection();



            if(record[0]) {
              var editWin = Ext.create('cobuy.view.ViewFailedSubscriptionPaymentWin');
        	  var form = editWin.down('form');


        			Ext.Ajax.request({

        				 url: '/cobuy/index.php?r=SubscriptionPayment/retrievePaymentDetailsForUpdate',
        			     params: {
        					id: record[0].get('id'),
                            member_id:record[0].get('member_id'),
                             bank_account_id:record[0].get('bank_account_id')
        				},
                     //success or failure
        				success: function(response){
        				var jsonResponse = Ext.decode(response.responseText);
        					if (jsonResponse.success) {

                                var bank_account = jsonResponse.bank_number;
                                var membership_type = jsonResponse.membership_type;
                                var member=jsonResponse.member;
                                var payee = jsonResponse.payee;
                                var membership_number=jsonResponse.membership_number;


        					}

        					var values = {

                                bank_account:bank_account,
                                membership_type:membership_type,
                                member:member,
                                payee:payee,
                                membership_number:membership_number,
                                amount_for_display:Ext.util.Format.number(record[0].get('amount'),'0,000.00'),
                                discounted_amount_for_display:Ext.util.Format.number(record[0].get('discounted_amount'),'0,000.00'),
                                net_amount_for_display:Ext.util.Format.number(record[0].get('net_amount'),'0,000.00')


        					};


        					form.loadRecord(record[0]);

        					form.getForm().setValues(values);


        				}




        			});


        			editWin.show();
        		} else {
        				Ext.Msg.alert('Error!', 'Please Select a Subscription Payment to view');
        		}







    },

    onViewingThisFailedSubscriptionPaymentButtonClick: function(button, e, eOpts) {
        var win = button.up('window');

        win.destroy();
    },

    onFailedSubscriptionPaymentPanelRender: function(component, eOpts) {
        component.down('grid').getStore().load();
    },

    onFailedSubscriptionPaymentGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
        this.onViewFailedSubscriptionPaymentButtonClick();
    },

    init: function(application) {
        this.control({
            "failedsubscriptionpaymentmainpanel button#viewBtn": {
                click: this.onViewFailedSubscriptionPaymentButtonClick
            },
            "viewfailedsubscriptionpaymentwin button#okBtn": {
                click: this.onViewingThisFailedSubscriptionPaymentButtonClick
            },
            "failedsubscriptionpaymentmainpanel ": {
                render: this.onFailedSubscriptionPaymentPanelRender
            },
            "failedsubscriptionpaymentmainpanel grid": {
                itemdblclick: this.onFailedSubscriptionPaymentGridpanelItemDblClick
            }
        });
    }

});
