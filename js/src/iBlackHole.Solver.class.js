function Solver(trajectory) {
    this.trajectory = trajectory;
	this.computed = {past:false, future:false};
    this.vRadialSgnTmp = undefined;     // changes sign when bounced
    this.computeFuturePoints = function(n){
        this.vRadialSgnTmp = this.trajectory.pars.vRadialSgn;
        for (i = 0; i < n ; i++)
        {
            this.computePoint(+1);
        }

    };
    this.computePastPoints = function(n){
        this.vRadialSgnTmp = - this.trajectory.pars.vRadialSgn;
        for (i = 0; i < n ; i++)
        {
            this.computePoint(-1);
        }
    };
    this.computePoint = function(directionOfRotation){
		currentTrajectory = directionOfRotation == +1 ? this.trajectory.points.future : this.trajectory.points.past;
  //      var vRadialSgn = this.trajectory.pars.vRadialSgn;   // changes sign when bounced
        var dPhi =  2 * Math.PI / 360;   // initial step size
        var dirOfRot = directionOfRotation * this.trajectory.pars.vPerpSgn; // if clockwise or counterclockwise

        var len = currentTrajectory.length;
        var lastPoint = currentTrajectory[len - 1];

        var integrandSq =  ( this.trajectory.pars.bInvSq
            - (lastPoint.u * lastPoint.u) * (1 - this.trajectory.renderer.controller.rs * lastPoint.u));
        // integrandSq = (du / dphi)^2;     na razie bez "aInvSq
        // uwaga, może dodać minus
        if( integrandSq < 0 ){  // bounce!
            integrandSq = - integrandSq;
            this.vRadialSgnTmp = - this.vRadialSgnTmp
        }
        var dU = - this.vRadialSgnTmp * Math.sqrt(integrandSq) * dPhi

        currentTrajectory.push({
                u: lastPoint.u + dU,                    //  sometimes u gets negative but then renderer deals with it
                phi: lastPoint.phi + dirOfRot * dPhi
                });
	};
}