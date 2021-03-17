<template>
    <div>
        <el-dialog title="Tips" :visible="visible" width="30%" :before-close="handleClose">
            <el-form  label-width="100px" :model="form">
                <el-form-item label="Name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="Activity zone">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="Activity form">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose()">Cancel</el-button>
            <el-button type="primary" @click="sendForm()">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    props: {
        visible: Boolean,
        handleClose: Function,
        form: Object
    },
    methods: {
        sendForm() {
            console.log('Sending form', this.form);
            if (this.form.id) { // если есть id значит мы редактируем
                axios.put('/api/api' + '/' + this.form.id, {
                    data: this.form
                }).then(() => {
                    this.handleClose(); // закрыть модалку после сохранения
                });
            } else { // если нет id значит мы создаем
                axios.post('/api/api', {
                    data: this.form
                }).then(() => {
                    this.handleClose(); // закрыть модалку после сохранения
                });
            }
        }
    }
}
</script>
