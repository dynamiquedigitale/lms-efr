<template>
	<div>
	  	<select class="form-control" :id="id" :name="name" :disabled="disabled" :required="required"></select>
	</div>
</template>
  
<script>
export default {
	name: 'AppSelect',
	// eslint-disable-next-line sort-keys
	data() {
	  	return {
			select2: null,
	  	}
	},
	emits: ['update:modelValue', 'select'],
	props: {
		clearable: { default: false, type: Boolean },
	  	disabled: { default: false, type: Boolean },
		id: { default: '', type: String },
		label: { default: 'label', type: String },
		modelValue: [String, Array], // previously was `value: String`
		multiple: { default: false, type: Boolean },
		name: { default: '', type: String },
    	options: { default: () => [], type: Array },
    	placeholder: { default: '', type: String },
		required: { default: false, type: Boolean },
		searchable: { default: false, type: Boolean },
		selector: { default: 'value', type: String },
		settings: { default: () => ({ /**/ }), type: Object },
		transformer: { default: null, type: Function },
	},
	// eslint-disable-next-line sort-keys
	computed: {
		config() {
			let minimumResultsForSearch = this.settings.minimumResultsForSearch || 0
			if (!this.searchable) {
				minimumResultsForSearch = -1
			}

			return {
				...this.settings,
				allowClear: this.clearable,
				disabled: this.disabled,
				minimumResultsForSearch,
				multiple: this.multiple,
				placeholder: this.placeholder,
			}
		},
		data() {
			return this.options.map(option => {
				if (typeof option === 'object') {
					option = this.reducer(option)
					if (option.children && option.children instanceof Array) {
						option.children = option.children.map(child => this.reducer(child))
					}
				}

				return option
			})
		},
	},
	watch: {
		modelValue: {
			deep: true,
			handler(val) {
				this.setValue(val)
			},
	  	},
		options: {
		  	deep: true,
			handler() {
				this.setOption(this.data)
			},
	  	},
	},
	// eslint-disable-next-line sort-keys
	methods: {
		reducer(obj) {
			if (this.transformer) {
				return this.transformer(obj)
			}

			return {
				...obj,
				id  : obj.id || obj[this.selector],
				text: obj.text || obj[this.label],
			}
		},
		
		setOption(val = []) {
			this.select2.empty()
			this.select2.select2({
				...this.config,
				data: val,
			})
			this.setValue(this.modelValue)
	  	},
	  	setValue(val) {
			if (val instanceof Array) {
				this.select2.val([...val])
			} else {
				this.select2.val([val])
			}
			this.select2.trigger('change')
	  	},
	},
	mounted() {
	  	// eslint-disable-next-line no-undef
	  	this.select2 = $(this.$el)
			.find('select')
			.select2({
		  		...this.config,
		  		data: this.data,
			})
			.on('select2:select select2:unselect', ev => {
				this.$emit('update:modelValue', this.select2.val())
				this.$emit('select', ev['params']['data'])
			})
	  		this.setValue(this.modelValue)
	},
	// eslint-disable-next-line sort-keys
	beforeUnmount() {
	  	this.select2.select2('destroy')
	},
}
</script>
