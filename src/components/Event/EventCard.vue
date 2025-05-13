<template>
  <div class="event-card">
    <div class="event-card-row">
      <div class="card-image">
        <img :src="event.eventImageUrl" alt="Event Image" />
      </div>
      <div class="card-main">
        <h3 class="card-title">{{ event.eventName }}</h3>
        <p class="card-description">{{ event.eventDescription }}</p>
      </div>
      <div class="card-meta">
        <div class="meta-block">
          <label class="meta-label">Date</label>
          <div class="meta-content">
            {{ event.eventStartDate }}<br />- {{ event.eventEndDate }}
          </div>
        </div>
        <div class="meta-block">
          <label class="meta-label">Location</label>
          <div class="meta-content">{{ event.eventLocation }}</div>
        </div>
        <router-link
          v-if="event.eventLinkUrl"
          :to="event.eventLinkUrl"
          class="card-action"
        >
          ▶
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.event-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.event-card-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.card-image img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
}

.card-main {
  flex: 1;
  min-width: 200px;
}

.card-title {
  font-size: 1.8em;
  font-weight: 600;
  color: #3d256b;
}

.card-description {
  margin-top: 8px;
  font-size: 1em;
  color: #333;
  line-height: 1.5;
}

.card-meta {
  min-width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  text-align: right;
}

.meta-block {
  margin-bottom: 12px;
}

.meta-label {
  font-size: 0.75em;
  color: #888;
}

.meta-content {
  font-size: 1em;
  color: #3d256b;
  font-weight: 500;
}

.card-action {
  font-size: 1.5em;
  color: #a889e9;
  text-decoration: none;
}

@media (max-width: 768px) {
  .event-card-row {
    flex-direction: column;
    align-items: center;
  }

  .card-meta {
    align-items: center;
    text-align: center;
  }

  .card-action {
    margin-top: 12px;
  }
}
</style>