class PosRegiste {


    constructor(id ,date,user_id,cash_in_hand,status,total_cash,
        total_cheques,total_cc_slips,total_cash_submitted,
        total_cheques_submitted,total_cc_slips_submitted,
        note,closed_at,transfer_opened_bills,closed_by,
        total_ba,total_gains,total_refunds,
        total_returned   ){

        this.id = id ;
        this.date = date;
        this.user_id =user_id;
        this.cash_in_hand = cash_in_hand;
        this.status=status ;
        this.total_cash = total_cash;
        this.total_cheques =total_cheques ;
        this.total_cc_slips = total_cc_slips;
        this.total_cash_submitted = total_cash_submitted;
        this.total_cheques_submitted = total_cheques_submitted ;
        this.total_cc_slips_submitted =total_cc_slips_submitted;
        this.note = note;
        this.closed_at = closed_at;
        this.transfer_opened_bills =transfer_opened_bills;
        this.closed_by =closed_by;
        this.total_ba = total_ba;
        this.total_gains = total_gains;
        this.total_refunds = total_refunds;
        this.total_returned = total_returned;
    }

    static from(json){
        return Object.assign(new PosRegiste(), json);
      }



}


export default PosRegiste ;