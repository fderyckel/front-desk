frappe.listview_settings['Inn Membership Card'] = {
    onload: function (listview) {
        listview.page.add_menu_item(__('Generate'), function() {
            generate_card();
        });
    }
};

function generate_card() {
    let fields = [
        {
            'label': __('Amount'),
            'fieldname': 'card_amount',
            'fieldtype': 'Data',
            'reqd':1
        },
    ];
    var d = new frappe.ui.Dialog({
        title: __('Generate Bulk Cards'),
        fields: fields,
    });
    d.set_primary_action(__('Generate'), ()=> {
        frappe.call({
           method: 'inn.inn_hotels.doctype.inn_membership_card.inn_membership_card.generate_bulk_cards',
           args: {
               amount: d.get_values().card_amount
           } ,
            callback: (r) => {
               if (r.message) {
                   frappe.msgprint('New Membership Cards Generated. ' + r.message + '<br />. Please Reload the Page to update the list');
               }
            }
        });
        d.hide();
    });
    d.show();
}