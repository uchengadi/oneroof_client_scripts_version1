/*
 * File: app/controller/FailedDeliveriesController.js
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

Ext.define('cobuy.controller.FailedDeliveriesController', {
    extend: 'Ext.app.Controller',

    models: [
        'OrderDelivery'
    ],
    stores: [
        'OrderDeliveries'
    ],
    views: [
        'FailedDeliveryMainpanel',
        'ViewFailedDeliveryWin'
    ],

    refs: [
        {
            ref: 'allFailedDeliveriesGrid',
            selector: 'faileddeliverymainpanel grid'
        }
    ],

    onViewFailedDeliveriesButtonClick: function(button, e, eOpts) {
        var grid = this.getAllFailedDeliveriesGrid(),
        		record = grid.getSelectionModel().getSelection();

        		if(record[0]) {
        			var editWin = Ext.create('cobuy.view.ViewFailedDeliveryWin');
        			var form = editWin.down('form');


        			Ext.Ajax.request({

        				 url: '/cobuy/index.php?r=OrderDelivery/retrieveDeliveredOrderDetails',
        			     params: {
        					order_id: record[0].get('order_id'),
                            member_id: record[0].get('member_id'),
                           order_assigned_by: record[0].get('order_assigned_by'),
                             order_assigned_to: record[0].get('order_assigned_to'),
                             date_of_assignment:record[0].get('date_of_assignment')
        				},
                     //success or failure
        				success: function(response){
        				var jsonResponse = Ext.decode(response.responseText);
        					if (jsonResponse.success) {

                                var delivery_status = jsonResponse.delivery_status;
                                var member_remark = jsonResponse.member_remark;
                                var order_number = jsonResponse.order_number;
                                var order_assigned_by = jsonResponse.order_assigned_by;
                                var delivered_by = jsonResponse.order_delivered_by;
                                var member = jsonResponse.member;
                                var date_of_delivery = jsonResponse.date_of_delivery;
                                var delivery_confirmed_by = jsonResponse.delivered_confirmed_by;
                                var date_of_delivery_confirmation = jsonResponse.date_of_delivery_confirmation;

                               // console.log('date of delivery is:',date_of_delivery);

        					}

        					var values = {

                                order_number:order_number,
                                member_remark:member_remark,
                                delivery_status:delivery_status,
                                order_assigned_by:order_assigned_by,
                                order_delivered_by:delivered_by,
                                date_of_delivery:date_of_delivery,
                                delivery_confirmed_by:delivery_confirmed_by,
                                date_of_delivery_confirmation:date_of_delivery_confirmation




        					};


        					form.loadRecord(record[0]);

        					form.getForm().setValues(values);


        				}




        			});


        			editWin.show();
        		} else {
        				Ext.Msg.alert('Error!', 'Please Select a failed order to view');
        		}
    },

    onViewingThisFailedFeliveryButtonClick: function(button, e, eOpts) {
        var win = button.up('window');

        win.destroy();
    },

    onFailedDeliveryGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
        this.onViewFailedDeliveriesButtonClick();
    },

    onFailedDeliveryPanelRender: function(component, eOpts) {
        component.down('grid').getStore().load();
    },

    init: function(application) {
        this.control({
            "faileddeliverymainpanel button#viewBtn": {
                click: this.onViewFailedDeliveriesButtonClick
            },
            "viewfaileddeliverywin button#viewBtn": {
                click: this.onViewingThisFailedFeliveryButtonClick
            },
            "faileddeliverymainpanel grid": {
                itemdblclick: this.onFailedDeliveryGridpanelItemDblClick
            },
            "faileddeliverymainpanel": {
                render: this.onFailedDeliveryPanelRender
            }
        });
    }

});
