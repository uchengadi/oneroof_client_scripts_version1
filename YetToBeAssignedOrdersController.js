/*
 * File: app/controller/YetToBeAssignedOrdersController.js
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

Ext.define('cobuy.controller.YetToBeAssignedOrdersController', {
    extend: 'Ext.app.Controller',

    models: [
        'Order'
    ],
    stores: [
        'Orders'
    ],
    views: [
        'YetToBeAssignedOrdersMainpanel',
        'TheYetToBeAssignedOrderWin'
    ],

    refs: [
        {
            ref: 'allYetToBeAssignedOrderGrid',
            selector: 'yettobeassignedordersmainpanel grid'
        }
    ],

    onYetToBeAssignedOrdersButtonClick: function(button, e, eOpts) {
        var grid = this.getAllYetToBeAssignedOrderGrid(),
        		record = grid.getSelectionModel().getSelection();

        		if(record[0]) {
        			var editWin = Ext.create('cobuy.view.TheYetToBeAssignedOrderWin');
        			var form = editWin.down('form');


        			Ext.Ajax.request({

        				 url: '/cobuy/index.php?r=Order/retrieveOrderDetails',
        			     params: {
        					order_initiated_by: record[0].get('order_initiated_by'),
                             delivery_city_id:record[0].get('delivery_city_id'),
                             delivery_state_id:record[0].get('delivery_state_id'),
                             delivery_country_id:record[0].get('delivery_country_id'),
                             order_id:record[0].get('id')
        				},
                     //success or failure
        				success: function(response){
        				var jsonResponse = Ext.decode(response.responseText);
        					if (jsonResponse.success) {

                                var requester = jsonResponse.requester;
                                var country = jsonResponse.country;
                                var state = jsonResponse.state;
                                var city = jsonResponse.city;
                                 var payment_status=jsonResponse.payment_status;
                                var delivery_type=jsonResponse.delivery_type;



        					}

        					var values = {

                                requester:requester,
                                city:city,
                                state:state,
                                country:country,
                                payment_status:payment_status,
                                order_delivery_type:delivery_type


        					};


        					form.loadRecord(record[0]);

        					form.getForm().setValues(values);


        				}




        			});



        			editWin.show();
        		} else {
        				Ext.Msg.alert('Error!', 'Please Select an Order');
        		}
    },

    onViewThisYetToBeAssignedOrderButtonClick: function(button, e, eOpts) {
        var win = button.up('window');

        win.destroy();
    },

    onYetToBeAssignedForDeliveryGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
        //this.onYetToBeAssignedOrdersButtonClick();

        var win = Ext.create('cobuy.view.ProductsInOrderWin');

        var values = {
            order_id:record.get('id'),
            status: record.get('status')
        };


        //load the form

        win.down('form').getForm().setValues(values);


        win.show();
    },

    onYetToBeAssignedOrderPanelRender: function(component, eOpts) {
        component.down('grid').getStore().load();
    },

    init: function(application) {
        this.control({
            "yettobeassignedordersmainpanel button#viewBtn": {
                click: this.onYetToBeAssignedOrdersButtonClick
            },
            "theyettobeassignedorderwin button#viewBtn": {
                click: this.onViewThisYetToBeAssignedOrderButtonClick
            },
            "yettobeassignedordersmainpanel grid": {
                itemdblclick: this.onYetToBeAssignedForDeliveryGridpanelItemDblClick
            },
            "yettobeassignedordersmainpanel": {
                render: this.onYetToBeAssignedOrderPanelRender
            }
        });
    }

});
