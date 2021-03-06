/*
 * File: app/controller/ProductsInCartController.js
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

Ext.define('cobuy.controller.ProductsInCartController', {
    extend: 'Ext.app.Controller',

    models: [
        'OrderHasProduct'
    ],
    stores: [
        'ProductsInCart'
    ],
    views: [
        'EditProductInCartWin',
        'EditProductInCartForm',
        'ProductsInCartView'
    ],

    refs: [
        {
            ref: 'allProductsInAnOrderGrid',
            selector: 'productsinorderwin grid'
        }
    ],

    onAddProductToCartButtonClick: function(button, e, eOpts) {
        var win =Ext.create('cobuy.view.AddNewProductToCartWin');

        win.show();
    },

    onEditingProductInCartButtonClick: function(button, e, eOpts) {
        console.log('edit button clicked');
    },

    onDeleteProductInCartButtonClick: function(button, e, eOpts) {
        console.log('delete button clicked');
    },

    onCloseTheWindowButtonClick: function(button, e, eOpts) {
        var win = button.up('window');

        win.destroy();
    },

    init: function(application) {
        this.control({
            "productsinorderwin button#addBtn": {
                click: this.onAddProductToCartButtonClick
            },
            "productsinorderwin button#editBtn": {
                click: this.onEditingProductInCartButtonClick
            },
            "productsinorderwin button#deleteBtn": {
                click: this.onDeleteProductInCartButtonClick
            },
            "productsinorderwin button#closeBtn": {
                click: this.onCloseTheWindowButtonClick
            }
        });
    }

});
