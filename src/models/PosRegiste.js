class PosRegiste {


    constructor(id=NaN ,date,user_id,cash_in_hand,status="Open",total_cash=0,
        total_cheques=0,total_cc_slips=0,total_cash_submitted=0,
        total_cheques_submitted=0,total_cc_slips_submitted=0,
        note=0,closed_at,transfer_opened_bills,closed_by,
        total_ba=0,total_gains=0,total_refunds=0,
        total_returned=0   ){

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