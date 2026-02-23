<script setup>
defineProps(['todo', 'editingId', 'editText'])
defineEmits(['toggle', 'startEdit', 'saveEdit', 'delete', 'cancelEdit', 'update:editText'])

const getStatusColor = (todo) => {
  if (todo.completed) return 'bg-green-500' 
  if (!todo.deadline) return 'bg-slate-300'
  
  const today = new Date()
  const deadline = new Date(todo.deadline)
  const diff = (deadline - today) / (1000 * 60 * 60 * 24)
  
  if (diff < 0) return 'bg-red-600' 
  if (diff <= 3) return 'bg-orange-500' 
  return 'bg-blue-500' 
}
</script>

<template>
  <li class="task-card shadow-sm">
    <div v-if="editingId === todo.id" class="edit-mode">
      <input :value="editText" @input="$emit('update:editText', $event.target.value)" class="edit-input" />
      <button @click="$emit('saveEdit', todo)" class="save-btn">Kaydet</button>
    </div>

    <div v-else class="view-mode">
      <div class="left-section" @click="$emit('toggle', todo)">
        <div class="status-indicator" :class="getStatusColor(todo)"></div>
        <div class="content">
          <span class="task-title" :class="{ 'completed-text': todo.completed }">{{ todo.text }}</span>
          <div class="meta-data">
            <span v-if="todo.deadline" class="deadline-text">📅 {{ todo.deadline }}</span>
            <span class="priority-badge" :class="todo.priority.toLowerCase()">{{ todo.priority }}</span>
          </div>
        </div>
      </div>
      <div class="right-section">
        <button @click="$emit('startEdit', todo)" class="action-btn edit">Düzenle</button>
        <button @click="$emit('delete', todo.id)" class="action-btn delete">Sil</button>
      </div>
    </div>
  </li>
</template>

<style scoped>
.task-card { background: white; border-radius: 12px; padding: 16px; margin-bottom: 12px; list-style: none; transition: all 0.2s; border: 1px solid #e2e8f0; }
.task-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.view-mode { display: flex; justify-content: space-between; align-items: center; }
.left-section { display: flex; align-items: center; gap: 16px; cursor: pointer; }
.status-indicator { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.task-title { font-weight: 600; color: #1e293b; }
.completed-text { text-decoration: line-through; color: #94a3b8; }
.meta-data { display: flex; gap: 12px; margin-top: 4px; }
.deadline-text { font-size: 0.75rem; color: #64748b; font-weight: 600; }
.priority-badge { font-size: 0.65rem; padding: 2px 8px; border-radius: 6px; font-weight: 800; text-transform: uppercase; }
.high, .yüksek { background: #fee2e2; color: #dc2626; }
.orta { background: #ffedd5; color: #ea580c; }
.düşük { background: #f0f9ff; color: #0284c7; }
.action-btn { background: none; border: none; font-size: 0.8rem; font-weight: 700; cursor: pointer; color: #cbd5e1; margin-left: 10px; }
.edit:hover { color: #3b82f6; }
.delete:hover { color: #ef4444; }
.edit-mode { display: flex; gap: 8px; width: 100%; }
.edit-input { flex: 1; border: 1px solid #3b82f6; border-radius: 8px; padding: 8px; outline: none; }
.save-btn { background: #3b82f6; color: white; border: none; border-radius: 8px; padding: 0 16px; cursor: pointer; }
</style>