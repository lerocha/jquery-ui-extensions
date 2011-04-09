﻿/*!
 * Extensions for jQuery UI 1.8.7 datepicker
 *
 * Copyright 2011, Luis Rocha
 * Released under the MIT license.
 *
 */

// Extending jQuery UI Datepicker
$.extend($.datepicker, { getLastDay: function (month, year) {
    // month is from 0 to 11.
    if (month == 1) {
        if (year % 400 == 0) {
            return 29;
        } else if (year % 100 == 0) {
            return 28;
        } else if (year % 4 == 0) {
            return 29;
        }
        return 28;
    } else if (month < 7) {
        return 31 - (month % 2);
    } else {
        return 30 + (month % 2);
    }
}
});

// Extends datepicker with shortcuts for today, begin and end of the year and month.
$.extend($.datepicker, { customKeyPress: function (event) {
    var inst = $.datepicker._getInst(event.target);
    var c = String.fromCharCode(event.which).toLowerCase();
    switch (c) {
        case "y":
            // First day of the (y)ear.
            if (inst.selectedDay == 1 && inst.selectedMonth == 0) {
                // First day of previous year.
                $.datepicker._adjustDate(event.target, -12, "M");
            } else if (inst.selectedMonth == 0) {
                // First day of the current year.
                $.datepicker._adjustDate(event.target, 1 - inst.selectedDay, "D");
            } else {
                // First day of the current year.
                inst.selectedDay = 1;
                $.datepicker._adjustDate(event.target, -inst.selectedMonth, "M");
            }
            break;
        case "r":
            // Last day of the yea(r).
            if (inst.selectedDay == 31 && inst.selectedMonth == 11) {
                // Last day of next year.
                $.datepicker._adjustDate(event.target, +12, "M");
            } else if (inst.selectedMonth == 11) {
                // Last day of current year.
                $.datepicker._adjustDate(event.target, 31 - inst.selectedDay, "D");
            } else {
                // Last day of current year.
                inst.selectedDay = 31;
                $.datepicker._adjustDate(event.target, 11 - inst.selectedMonth, "M");
            }
            break;
        case "m":
            // First day of the (m)onth.
            if (inst.selectedDay == 1) {
                $.datepicker._adjustDate(event.target, -1, "M");
            } else {
                $.datepicker._adjustDate(event.target, 1 - inst.selectedDay, "D");
            }
            break;
        case "h":
            // Last day of the mont(h).
            var end = $.datepicker.getLastDay(inst.selectedMonth, inst.selectedYear);
            if (inst.selectedDay == end) {
                $.datepicker._adjustDate(event.target, +1, "M");
            } else {
                $.datepicker._adjustDate(event.target, end - inst.selectedDay, "D");
            }
            break;
        case "t":
            // Today (same as Ctrl+Home).
            $.datepicker._gotoToday(event.target);
            break;
        case "+":
            // Increase day (same as Ctrl+Right).
            $.datepicker._adjustDate(event.target, +1, 'D');
            break;
        case "-":
            // Decrease day (same as Ctrl+Left).
            $.datepicker._adjustDate(event.target, -1, 'D');
            break;
    }
}
});

