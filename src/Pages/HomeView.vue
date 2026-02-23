<script setup>
import { ref, computed } from 'vue'
import TodoItem from '../Components/TodoItem.vue'

const newTodo = ref('')
const deadline = ref('')
const priority = ref('Orta')
const todos = ref([])
const editingId = ref(null)
const editText = ref('')

const progress = computed(() => {
  if (todos.value.length === 0) return 0
  const completed = todos.value.filter(t => t.completed).length
  return Math.round((completed / todos.value.length) * 100)
})

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({ 
      id: Date.now(), text: newTodo.value, completed: false,
      deadline: deadline.value, priority: priority.value
    })
    newTodo.value = ''; deadline.value = ''; priority.value = 'Orta';
  }
}

const startEdit = (todo) => {
  editingId.value = todo.id
  editText.value = todo.text
}

const saveEdit = (todo) => {
  if (editText.value.trim()) {
    todo.text = editText.value
    editingId.value = null
  }
}

const deleteTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

const toggleTodo = (todo) => {
  if (editingId.value !== todo.id) todo.completed = !todo.completed
}
</script>

<template>
  <div class="dashboard-container">
    <aside class="sidebar">
      <div class="profile-section">
        <div class="avatar">GP</div>
        <h3>Görev Panel</h3>
        <p>Yazılım Mühendisi</p>
      </div>
      <nav class="nav-links">
        <div class="nav-item active">📊 Dashboard</div>
        <div class="nav-item">📅 Takvim</div>
        <div class="nav-item">⚙️ Ayarlar</div>
      </nav>
    </aside>

    <main class="main-content">
      <header class="top-header">
        <div class="header-text">
          <h1>Görev Paneli</h1>
          <p>İş akışınızı ve hedeflerinizi yönetin</p>
        </div>
        <div class="progress-box shadow-sm">
          <div class="progress-info">
            <span>Tamamlanma</span>
            <span class="pct">%{{ progress }}</span>
          </div>
          <div class="bar-bg">
            <div class="bar-fill" :style="{ width: progress + '%' }"></div>
          </div>
        </div>
      </header>

      <section class="input-card shadow-sm">
        <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Yeni görev tanımlayın..." class="task-input" />
        <div class="actions">
          <input type="date" v-model="deadline" class="date-input" />
          <select v-model="priority" class="priority-select">
            <option>Düşük</option>
            <option>Orta</option>
            <option>Yüksek</option>
          </select>
          <button @click="addTodo" class="add-btn">Görev Ekle</button>
        </div>
      </section>

      <ul class="task-list">
        <TodoItem 
          v-for="todo in todos" :key="todo.id" :todo="todo"
          :editingId="editingId" v-model:editText="editText"
          @toggle="toggleTodo" @startEdit="startEdit" @saveEdit="saveEdit"
          @delete="deleteTodo" @cancelEdit="editingId = null"
        />
      </ul>
    </main>
  </div>
</template>

<style scoped>
.dashboard-container { display: flex; min-height: 100vh; background: #f8fafc !important; }
.sidebar { width: 260px; background: white; padding: 40px 20px; border-right: 1px solid #e2e8f0; }
.avatar { width: 50px; height: 50px; background: #3b82f6; border-radius: 12px; margin: 0 auto 10px; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; }
.profile-section { text-align: center; margin-bottom: 30px; }
.profile-section h3 { font-size: 1rem; color: #0f172a; margin: 0; }
.profile-section p { font-size: 0.75rem; color: #64748b; }
.nav-item { padding: 12px; border-radius: 8px; margin-bottom: 5px; color: #64748b; font-weight: 600; cursor: pointer; }
.nav-item.active { background: #f1f5f9; color: #3b82f6; }
.main-content { flex: 1; padding: 40px; }
.top-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
h1 { font-size: 2rem; font-weight: 800; color: #0f172a; }
.progress-box { background: white; padding: 15px; border-radius: 12px; min-width: 180px; }
.progress-info { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 8px; }
.pct { color: #3b82f6; }
.bar-bg { background: #f1f5f9; height: 6px; border-radius: 10px; overflow: hidden; }
.bar-fill { background: #3b82f6; height: 100%; transition: width 0.4s; }
.input-card { background: white; border-radius: 12px; padding: 20px; margin-bottom: 25px; }
.task-input { width: 100%; border: none; border-bottom: 2px solid #f1f5f9; padding: 10px 0; margin-bottom: 15px; font-size: 1rem; outline: none; }
.actions { display: flex; gap: 10px; }
.date-input, .priority-select { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px; color: #64748b; font-size: 0.85rem; }
.add-btn { background: #3b82f6; color: white; border: none; padding: 8px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; margin-left: auto; }
</style>