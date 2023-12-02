<template>
  <q-page class="flex flex-center justify-center">
    <SearchBar @search="handleSearch" />
    <SearchResults ref="searchResults" />
    aaaaa
  </q-page>
</template>

<script>
import { ref } from "vue";
import SearchBar from "../components/SearchBar.vue";
import SearchResults from "../components/SearchResults.vue";

export default {
  components: {
    SearchBar,
    SearchResults,
  },
  setup() {
    const searchResults = ref(null);

    const handleSearch = async (searchTerm, date) => {
      const { data, error } = await supabase
        .from("your_table_name")
        .select("*")
        .ilike("search_column", `%${searchTerm}%`)
        .eq("date_column", date);

      if (error) {
        console.error(error);
      } else {
        searchResults.value.setResults(data);
      }
    };

    return {
      searchResults,
      handleSearch,
    };
  },
};
</script>
