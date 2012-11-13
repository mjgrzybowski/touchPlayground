function Trajectory(pin,renderer){
    this.renderer = renderer;
	this.solver = new Solver(this);
    this.pin = pin;
    this.color = "#ffffff";
    this.points = {past: [], future: []};
    this.pars = {
        pos0: {
            cart : {x:undefined, y:undefined},
            polar : {r:undefined,phi:undefined,u:undefined}
        },
        L: undefined,   // angular momentum;    currently unsupported
        E: undefined,   // energy;              currently unsupported
        vPerp: undefined, // perpendicular velocity
        vPerpSgn: undefined,
        vRadialSgn: undefined,
        aInvSq: undefined,   // aInvSq = 1/(a*a);       a = L / (m * c);         for photons aInvSq = 0
        bInvSq: undefined   // bInvSq = 1/(b*b);       b = L * c / E;           c = 1
    };
    this.updatePars = function(){

        this.pars.pos0.cart = this.renderer.screen2worldCord(this.pin.pos);
        this.pars.pos0.polar = this.renderer.cart2invPolarCord(this.pars.pos0.cart);

        this.pars.vPerp = this.pin.v * Math.sin (this.pin.alpha - this.pars.pos0.polar.phi);
        this.pars.vPerpSgn = this.pars.vPerp > 0 ? 1 : -1;
        this.pars.vRadialSgn = Math.cos(this.pin.alpha - this.pars.pos0.polar.phi) > 0 ? 1 : -1;

        this.points.past = [ this.pars.pos0.polar ];
        this.points.future = [ this.pars.pos0.polar ];

		$('p.cnsl').html(
            'pin.alpha: '+this.pin.alpha+
                '</br> this.pars.pos0.polar.phi: ' +  this.pars.pos0.polar.phi +
                '</br> kat pomiedzy promieniem do dziury a V: ' +  (this.pin.alpha - this.pars.pos0.polar.phi)
        );

		//this.pars.vPerp = this.pin.v * Math.sin (-1*Math.PI/2);
		
        this.pars.aInvSq = (1 - this.pin.v * this.pin.v ) / Math.pow(this.pars.vPerp, 2); // to też do ew rewizji...
 //       this.pars.bInvSq = 1 / Math.pow(( 1/this.pars.pos0.polar.u )* this.pars.vPerp, 2); // poprawic? BYLO ZLE
        this.pars.bInvSq = Math.pow(this.pars.pos0.polar.u, 2)
            * ( Math.pow( this.pin.v / this.pars.vPerp, 2)  - this.pars.pos0.polar.u * this.renderer.controller.rs) // poprawione?
        // trzeba bylo sprawdzic na placach predkosc katowa do radialnej z rownania; na razie moze tylko dla v=c (?)
     }
    this.setPosition = function(pos){
        this.pin.pos.x = pos.x;
        this.pin.pos.y = pos.y;
        this.updatePars()
    };
    this.setVelocity = function(v, angle){
        this.pin.v = v;
        this.pin.alpha =  angle;
        this.updatePars()
    }
}