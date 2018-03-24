<template lang="pug">
    v-card
      v-card-title
        | Food Table
        v-spacer
        v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
      v-data-table.elevation-1(:headers="headers" :items="foods" :search="search" :rows-per-page-items="[50, 100]" item-key="_id")
        template(slot="items" slot-scope="props")
          td 
            v-edit-dialog(@open="tmp = props.item.name" @save="save(props.item._id, 'name', tmp)" large lazy)
              div {{ props.item.name }}
              .mt-3.title(slot="input") Update name
              v-text-field(slot="input" v-model="tmp" autofocus)
          td
            v-edit-dialog(@open="tmp = props.item.type" @save="save(props.item._id, 'type', tmp)" large lazy)
              div {{ props.item.type }}
              .mt-3.title(slot="input") Update type
              v-text-field(slot="input" v-model="tmp" autofocus)
          td
            v-edit-dialog(@open="tmp = props.item.time" @save="save(props.item._id, 'time', tmp)" large lazy)
              div {{ props.item.time }}
              .mt-3.title(slot="input") Update time
              v-text-field(slot="input" v-model="tmp" multi-line rows="2" autofocus)
          td
            v-edit-dialog(@open="tmp = props.item.menu" @save="save(props.item._id, 'menu', tmp)" large lazy)
              div {{ props.item.menu && props.item.menu.length < 100 ? props.item.menu : props.item.menu.slice(0, 100) + '...' }}
              .mt-3.title(slot="input") Update menu
              v-text-field(slot="input" v-model="tmp" multi-line rows="3" autofocus)
          td
            v-edit-dialog(@open="tmp = props.item.sensei" @save="save(props.item._id, 'sensei', tmp)" large lazy)
              div {{ props.item.sensei ? 'O' : '-' }}
              .mt-3.title(slot="input") 외밥최선생 출처
              v-text-field(slot="input" v-model="tmp" autofocus)

          td(@click="props.expanded = !props.expanded") 
            v-icon {{ props.item.images[0] ? 'image' : 'add_a_photo' }}


        template(slot="expand" slot-scope="props")
          v-container(grid-list-md)
            v-layout(row style="overflow-x: auto")
              v-btn.add_box(@click="onPickFile(props.item._id)")
                v-icon(large) add
              input(type="file" ref="image" name="image" accept="image/*" @change="onFilePicked" multiple)      
              .relative.ma-1(v-for="image in props.item.images" :key="image" )
                v-btn(icon absolute right @click="deleteImage(props.item._id, image)")
                  v-icon close
                img.h150(:src="`https://api.lento.in/public/images/${image}`" style="height: 192px;")

</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: '이름', value: 'name', align: 'left' },
        { text: '종류', value: 'type', align: 'left' },
        { text: '시간', value: 'time', align: 'left', sortable: false },
        { text: '메뉴', value: 'menu', align: 'left', sortable: false },
        { text: '외밥', value: 'sensei', align: 'left', sortable: false },
        { text: '사진', align: 'left', sortable: false }
      ],
      search: '',
      tmp: ''
    }
  },
  computed: {
    foods () {
      return this.$store.getters.foods
    }
  },
  methods: {
    save (id, key, data) {
      this.$store.dispatch('editWithKey', { id, key, data })
    },
    deleteImage (id, image) {
      if (!confirm('이미지를 삭제할까요?')) return
      this.$store.dispatch('deleteImage', { id, image })
    },
    onPickFile (id) {
      this.tmp = id
      this.$refs.image.click()
    },
    onFilePicked (event) {
      const files = event.target.files || event.dataTransfer.files
      if (!files) return
      const id = this.tmp
      this.$store.dispatch('saveImages', { files, id })
    }
  }
}
</script>

<style scoped>
.relative {
  position: relative;
}

.add_box {
  height: 192px;
  width: 96px;
}

input[type='file'] {
  position: absolute;
  left: -99999px;
}
</style>