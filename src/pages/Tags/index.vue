<template>
    <div>
        <a-tabs @change="tagTabChange">
            <a-tab-pane tab="标签管理" key="标签管理">
                <tag-manage />
            </a-tab-pane>
            <a-tab-pane tab="标签查询" key="标签查询">
                <tag-search />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import TagManage from './Tag.vue';
import TagSearch from './TagSearch.vue';

export default {
    components: {
        TagManage,
        TagSearch
    },
    methods: {
        tagTabChange(tabKey) {
            if (tabKey == '标签查询') {
                this.$bus.$emit('initTagSearch');
            }
        }
    }
}
</script>
