FileDrop.PeerView = Ember.View.extend(Ember.ViewTargetActionSupport, {
    isConnected: Ember.computed.alias('controller.model.isConnected'),
    classNames: ['peer'],
    classNameBindings: ['isConnected:connected:disconnected'],

    // Delegate click to hidden file field
    click: function (event) {
        var user = this.get('controller.controllers.index.user'),
            peer = this.get('controller.model');

        // Can't send files to yourself.
        if (user.get('uuid') === peer.get('uuid')) return;

        this.$('input[type=file]').click();
    },

    // Handle drop events
    dragEnter: function (event) {
        this.cancelEvent(event);
    },

    dragOver: function (event) {
        this.cancelEvent(event);
    },

    drop: function (event) {
        this.cancelEvent(event);

        var user = this.get('controller.controllers.index.user'),
            peer = this.get('controller.model'),
            connection = peer.get('peer.connection'),
            dt = event.originalEvent.dataTransfer,
            files = dt.files,
            file = files[0];

        // Can't send files to yourself.
        if (user.get('uuid') === peer.get('uuid')) return;

        console.log('Sending a file...', file);

        this.triggerAction("uploadFile", file);
    },

    cancelEvent: function (event) {
        event.stopPropagation();
        event.preventDefault();
    }
});