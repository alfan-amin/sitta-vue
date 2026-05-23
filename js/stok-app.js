new Vue({
    el: '#app',

    data: {
        upbjjList: dummyData.upbjjList,
        kategoriList: dummyData.kategoriList,
        stok: dummyData.stok,

        filterUpbjj: '',
        filterKategori: '',
        sortBy: '',
        showMenipis: false,
        showKosong: false,

        showModalForm: false,

        editMode: false,
        editIndex: null,

        form: {
            kode: '',
            judul: '',
            kategori: '',
            upbjj: '',
            lokasiRak: '',
            harga: '',
            qty: '',
            safety: '',
            catatanHTML: ''
        }
    },

    computed: {
        kategoriFiltered(){
            if(!this.filterUpbjj){
                return this.kategoriList;
            }

            let kategori = this.stok
                .filter(item => item.upbjj === this.filterUpbjj)
                .map(item => item.kategori);

            return [...new Set(kategori)];
        },

        stokFiltered(){
            let data = [...this.stok];

            if(this.filterUpbjj){
                data = data.filter(item => item.upbjj === this.filterUpbjj);
            }

            if(this.filterKategori){
                data = data.filter(item => item.kategori === this.filterKategori);
            }

            if(this.showMenipis){
                data = data.filter(item => item.qty < item.safety && item.qty > 0);
            }

            if(this.showKosong){
                data = data.filter(item => item.qty === 0);
            }

            if(this.sortBy === 'judul'){
                data.sort((a,b) => a.judul.localeCompare(b.judul));
            }

            if(this.sortBy === 'qty'){
                data.sort((a,b) => a.qty - b.qty);
            }

            if(this.sortBy === 'harga'){
                data.sort((a,b) => a.harga - b.harga);
            }

            return data;
        }
    },

    methods: {
        simpanData(){
            if(
                this.form.kode === '' ||
                this.form.judul === '' ||
                this.form.kategori === '' ||
                this.form.upbjj === '' ||
                this.form.lokasiRak === '' ||
                this.form.harga === '' ||
                this.form.qty === '' ||
                this.form.safety === ''
            ){
                alert("Semua data wajib diisi!");
                return;
            }

            let dataBaru = {
                kode: this.form.kode,
                judul: this.form.judul,
                kategori: this.form.kategori,
                upbjj: this.form.upbjj,
                lokasiRak: this.form.lokasiRak,
                harga: Number(this.form.harga),
                qty: Number(this.form.qty),
                safety: Number(this.form.safety),
                catatanHTML: this.form.catatanHTML
            };

            if(this.editMode){
                this.$set(this.stok, this.editIndex, dataBaru);
                alert("Data berhasil diperbarui.");
            }else{
                this.stok.push(dataBaru);
                alert("Data berhasil ditambahkan.");
            }

            this.tutupModal();
        },

        editData(item){
            this.editIndex = this.stok.indexOf(item);
            this.editMode = true;
            this.showModalForm = true;

            this.form = {
                kode: item.kode,
                judul: item.judul,
                kategori: item.kategori,
                upbjj: item.upbjj,
                lokasiRak: item.lokasiRak,
                harga: item.harga,
                qty: item.qty,
                safety: item.safety,
                catatanHTML: item.catatanHTML
            };
        },

        batalEdit(){
             this.tutupModal();
        },

        resetForm(){
            this.editMode = false;
            this.editIndex = null;

            this.form = {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                harga: '',
                qty: '',
                safety: '',
                catatanHTML: ''
            };
        },

        resetFilter(){
            this.filterUpbjj = '';
            this.filterKategori = '';
            this.sortBy = '';
            this.showMenipis = false;
            this.showKosong = false;
        },

        statusText(item){
            if(item.qty === 0){
                return "❌ Kosong";
            }else if(item.qty < item.safety){
                return "⚠️ Menipis";
            }else{
                return "✅ Aman";
            }
        },

        statusClass(item){
            if(item.qty === 0){
                return "badge-kosong";
            }else if(item.qty < item.safety){
                return "badge-menipis";
            }else{
                return "badge-aman";
            }
        },

        formatRupiah(angka){
            return Number(angka).toLocaleString("id-ID");
        },

        bukaModalTambah(){
            this.resetForm();
            this.showModalForm = true;
        },

        tutupModal(){
            this.showModalForm = false;
            this.resetForm();
        },
    },

    watch: {
        filterUpbjj(){
            this.filterKategori = '';
        },

        showMenipis(value){
            if(value){
                this.showKosong = false;
            }
        },

        showKosong(value){
            if(value){
                this.showMenipis = false;
            }
        }
    }
});