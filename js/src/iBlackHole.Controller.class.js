function Controller(doc) {
    this.doc = doc;
    this.renderer = undefined;
    this.trajectories = new Array();
    this.fingerDiff = {x:0,y:0};
    this.fingerDiffAngle = 0;
    this.dragMode = undefined;
    this.init = function () {
        this.renderer = new Renderer(this);
        this.renderer.initViewport();
        this.bindTouchEvents();
        this.rs = 25;        
    };

    this.bindTouchEvents = function () {
        this.doc.addEventListener("touchstart", this.touchEvent(this));
   //     this.doc.addEventListener("touchend", this.touchEvent(this)); lepiej tak bo przy edzie nieladnie przesuwa pozycje
        this.doc.addEventListener("touchmove", this.touchEvent(this));
    };

    this.dist = function(pos1, pos2){
        return Math.sqrt( Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) )
    };

    this.touchEvent = function (ctrl) {

        return function (event) {

            event.preventDefault();

            var allTouches = event.touches;

            var touchesPos = new Array();
            var vNew = 1;

            for (touchId in allTouches) {
                if (allTouches[touchId].pageX != undefined) {
                    touchesPos.push({x:allTouches[touchId].pageX, y:allTouches[touchId].pageY});

                }
            }

            var l = touchesPos.length;

            if (l == 0) {


            }

            if (l == 1) {

				ctrl.renderer.drawCircle(30,touchesPos[0].x,touchesPos[0].y);
                
				
                if (event.type == 'touchstart')
                {
                  

                }



            }


            if (l == 2) {

            }




        }
    };

}







