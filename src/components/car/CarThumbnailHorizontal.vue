<template>
  <div class="car-thumbnail">
    <q-card class="bg-green-1">
      <div class="row no-wrap">
        <div>
          <q-img :src="car.image_url[0]" />
        </div>
        <div class="details">
          <q-card-section>
            <router-link
              :to="generateRouterLink(car.car_id, dateFrom, dateTo)"
              class="title"
            >
              <div class="text-h6">{{ car.manufacturer }} {{ car.model }}</div>
            </router-link>

            <div><span class="label">Year:</span> {{ car.year }}</div>
            <div><span class="label">Mileage:</span> {{ car.mileage }} km</div>
            <div>
              <span class="label">Gear Box:</span> {{ car.transmission_type }}
            </div>
            <div><span class="label">Fuel Type:</span> {{ car.fuel_type }}</div>
          </q-card-section>
        </div>
        <div class="text-center price">
          <span class="pricevalue">{{ car.price }}€</span> / day
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
  dateFrom: String,
  dateTo: String,
});

const generateRouterLink = (carId, dateFrom, dateTo) => {
  if (dateFrom && dateTo) {
    return `/car?id=${encodeURIComponent(
      carId
    )}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
  } else {
    return `/car?id=${encodeURIComponent(carId)}`;
  }
};
</script>

<style scoped>
.q-card {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15); /* Adds subtle shadow for depth */
  transition: transform 0.2s ease-in-out;
}

.q-card:hover {
  transform: scale(1.02); /* Enlarges the item on hover */
}

.details {
  height: 130px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.details div {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 45vw;
  max-width: 200px;
}

.q-card {
  width: 80vw;
  height: 130px;
  max-width: 450px;
}

.q-img {
  height: 130px;
  width: 180px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.car-thumbnail {
  margin: 10px;
}

.car-thumbnail .text-h6 {
  margin-top: -12px;
  margin-bottom: 3px;
}

p {
  margin: 0;
}

.label {
  font-weight: 500;
}

.row {
  display: flex;
  align-items: center;
}

.pricevalue {
  font-size: 18px;
  font-weight: bold;
}

@media (max-width: 550px) {
  .details div {
    max-width: 160px;
  }
  .q-card {
    width: 90vw;
    height: 130px;
  }

  .q-img {
    height: 130px;
    width: 130px;
  }

  .pricevalue {
    font-size: 16px;
  }
}

.title {
  text-decoration: none;
  color: black;
}
</style>
