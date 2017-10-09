import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsKeysEdit.html';
Template.btsKeysEdit.onCreated(function() {
    let template = this
    template.subscribe("btsKey",FlowRouter.getParam("id"))
})

Template.btsKeysEdit.helpers({
    keys() {
        return BtsAnswerKeys.findOne({_id:FlowRouter.getParam("id")})
    },
    dayOne(day) {
    	return day=="1"
    },
    gradeIsSeven(grade) {
        return grade=="7"
    }
})

Template.btsKeysEdit.events({
    "change #btsNo"(event,template) {
        template.btsNo.set(event.target.value)
        localStorage.setItem("btsNo", event.target.value)
    },
    "click #save"(event,template) {
        event.preventDefault()
        let keys = BtsAnswerKeys.findOne({_id:FlowRouter.getParam("id")})
        let answerKeys = {
            
        }

        if (keys.day=="1") {
            answerKeys["physics"] = template.find("[name=physics]").value
            if (keys.grade=="7") {
                answerKeys["world_history"] = template.find("[name=world_history]").value
            } else {
                answerKeys["chemistry"] = template.find("[name=chemistry]").value
            }
            answerKeys["biology"] = template.find("[name=biology]").value
            answerKeys["computer"] = template.find("[name=computer]").value
            answerKeys["kazakh_kazakh"] = template.find("[name=kazakh_kazakh]").value
            answerKeys["literature_kazakh"] = template.find("[name=literature_kazakh]").value
            answerKeys["kazakh_russian"] = template.find("[name=kazakh_russian]").value
            answerKeys["literature_russian"] = template.find("[name=literature_russian]").value
            answerKeys["russian"] = template.find("[name=russian]").value
        } else {
            answerKeys["algebra"] = template.find("[name=algebra]").value
            answerKeys["geometry"] = template.find("[name=geometry]").value
            answerKeys["english"] = template.find("[name=english]").value
            answerKeys["turkish"] = template.find("[name=turkish]").value
            answerKeys["history"] = template.find("[name=history]").value
            answerKeys["geography"] = template.find("[name=geography]").value
        }
        Meteor.call("BtsAnswerKeys.Update", keys._id,answerKeys,function(err) {
            if (err) {
                alert(err.reason)
            } else {
                alert("Сақталды!")
            }
        })
        //FlowRouter.redirect("/admin/bts/keys")
    }
})