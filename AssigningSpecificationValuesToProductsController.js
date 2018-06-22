/*
 * File: app/controller/AssigningSpecificationValuesToProductsController.js
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

Ext.define('cobuy.controller.AssigningSpecificationValuesToProductsController', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'allSpecificationValuesToProductGrid',
            selector: 'assigningspecficationvaluestoproductmainpanel grid'
        }
    ],

    onAddingSpecificationValuesToProductButtonClick: function(button, e, eOpts) {
        var win = Ext.create('cobuy.view.AssigningSpecificationsValuesToProductWin');
        var form = win.down('form');
        Ext.Ajax.request({

        				 url: '/cobuy/index.php?r=ProductSpecification/retrieveallspecifications',

                     //success or failure
        				success: function(response){
        				var jsonResponse = Ext.decode(response.responseText);
        					if (jsonResponse.success) {

        					          var i, j,  len = jsonResponse.specification.length, spec;
                               for (i = 0; i < len; i++){
                                   spec = jsonResponse.specification[i];

                                   if(spec.code == '001'){

                                       var released_date = spec.id;
                                   }
                                   if(spec.code == '002'){

                                       var form_factor = spec.id;
                                   }
                                   if(spec.code == '003'){

                                       var dimension = spec.id;
                                   }
                                   if(spec.code == '004'){

                                       var weight = spec.id;
                                   }
                                   if(spec.code == '005'){

                                       var battery_capacity = spec.id;
                                   }
                                   if(spec.code == '006'){

                                       var removeable_battery = spec.id;
                                   }
                                   if(spec.code == '007'){

                                       var colour = spec.id;
                                   }
                                   if(spec.code == '008'){

                                       var screensize = spec.id;
                                   }
                                   if(spec.code == '009'){

                                       var touchscreen = spec.id;
                                   }
                                   if(spec.code =='010' ){

                                       var resolution = spec.id;
                                   }
                               }
                            }
                            var blank = " ";

                            var blank2 = " ";
                            var blank3 = " ";
                            var blank4 = " ";
                            var blank5 = " ";


        					var values = {
                                'specifications[]':[released_date,form_factor,blank,blank2,blank3,dimension,weight,blank4,blank5,battery_capacity,removeable_battery,colour,screensize,touchscreen,resolution]

                             };


        					//form.loadRecord(record[0]);

        					form.getForm().setValues(values);


        				}




        			});

        win.show();
    },

    onSaveAssignedSpecificationValuesToProductButtonClick: function(button, e, eOpts) {
        var win = button.up('window'),
        			formPanel = win.down('form'),
        			store = this.getAllSpecificationValuesToProductGrid().getStore();

        			if(formPanel.getForm().isValid()){
        				formPanel.getForm().submit({
        					clientValidation: true,
        					url: '/cobuy/index.php?r=ProductSpecification/assignSpecificationValuesToProduct',
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
            "assigningspecficationvaluestoproductmainpanel button#addBtn": {
                click: this.onAddingSpecificationValuesToProductButtonClick
            },
            "assigningspecificationsvaluestoproductwin button#saveBtn": {
                click: this.onSaveAssignedSpecificationValuesToProductButtonClick
            }
        });
    }

});
