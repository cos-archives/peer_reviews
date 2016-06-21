import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.createRecord('node', {
            tags: [],
        });
    },
    actions: {
        saveNodeSubmission(newNode, title, contributors, description, tags){
            if ((document.getElementById('title').value.length >= 3) &&
                    (document.getElementById('contributors').value.length >= 3) &&
                    (document.getElementById('description').value.length >= 6))  {

                let models = this.modelFor('conference.index');
                    newNode.setProperties({
                    title: title,
                    description: description,
                    category: 'project',
                    conference: models.conference,
                    tags: tags.toString(),
                });

                document.getElementById("fileSubmission").reset();
                newNode.save();
                this.transitionTo('conference.index', models.conference.id);
            }

            else {
                var controlErrors = this.controllerFor('conference.index.submission');
                controlErrors.send('displayErrors');
            }
        },

        cancel()
        {
            let models = this.modelFor('conference.index');
            this.transitionTo('conference.index', models.conference.id);
        }
    }
});