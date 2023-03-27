<template>
	<div>
		<van-search v-model="searchValue" placeholder="请输入搜索关键字" @search="onSearch" />
		<van-divider />
		<van-row>
			<van-col :span="8" v-for="item in filteredGoodsList" :key="item.id">
				<van-card>
					<img :src="item.imageUrl" class="goods-image" />
					<div class="goods-name">{{ item.name }}</div>
					<div class="goods-price">{{ item.price }}元</div>
				</van-card>
			</van-col>
		</van-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { Goods, getGoodsList } from "@/api/goods";
export default defineComponent({
	name: "goods-list",
	setup() {
		const goodsList = ref<Goods[]>([]);
		const searchValue = ref("");
		const filteredGoodsList = computed<Goods[]>(() =>
			goodsList.value.filter((item) =>
				item.name.toLowerCase().includes(searchValue.value.toLowerCase())
			)
		);
		const fetchGoodsList = async () => {
			goodsList.value = await getGoodsList();
		};
		const onSearch = (value: string) => {
			searchValue.value = value;
		};
		onMounted(() => {
			fetchGoodsList();
		});
		return {
			goodsList,
			searchValue,
			filteredGoodsList,
			fetchGoodsList,
			onSearch
		};
	}
});
</script>
<style scoped>
.goods-image {
	width: 100%;
	height: 200px;
	object-fit: cover;
}
.goods-name {
	font-size: 16px;
	font-weight: bold;
	margin-top: 10px;
	margin-bottom: 5px;
}
.goods-price {
	font-size: 14px;
	color: #999;
}
</style>
