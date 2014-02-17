define([], function () {

    /**
     * Convenience class for dealing with <input type='range'/>
     *
     * @constructor
     */
    var RangeInput = function (inputSelectorString, labelSelectorString, min, max, step, value) {
        this.label = $(labelSelectorString);

        this.sliderDiv = $(inputSelectorString);
        this.sliderDiv.attr('min', min);
        this.sliderDiv.attr('max', max);
        this.sliderDiv.attr('step', step);
        this.sliderDiv.val(value);
        this.sliderDiv.change(jQuery.proxy(internalHandleSliderMoved, this));

        internalHandleSliderMoved.call(this);
    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Event methods that delegate to jquery object for triggering/observing custom events.
//
// range-change-event          [newValue]
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    RangeInput.prototype.on = function (eventName, callback) {
        this.sliderDiv.on(eventName, callback);
    };

    RangeInput.prototype.trigger = function (eventName, customData) {
        this.sliderDiv.trigger(eventName, customData);
    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Update the range text display value.
     */
    RangeInput.prototype.setValue = function (newValue) {
        this.label.text(newValue);
        this.sliderDiv.val(newValue);
        this.notifyListeners(this.sliderDiv.val());
    };

    RangeInput.prototype.notifyListeners = function (newValue) {
        this.trigger("range-change-event", newValue);
    };

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /**
     * Update the range text display value.
     */
    function internalHandleSliderMoved() {
        this.label.text(this.sliderDiv.val());
        this.notifyListeners(this.sliderDiv.val());
    }


    return RangeInput;
});