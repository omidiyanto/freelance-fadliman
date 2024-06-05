-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `password` TEXT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Client_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `NIK` INTEGER NOT NULL DEFAULT 16,
    `name` TEXT NOT NULL,
    `password` TEXT NOT NULL,
    `division` TEXT NOT NULL,

    UNIQUE INDEX `Admin_NIK_key`(`NIK`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Barang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15) NOT NULL,
    `supplier` TEXT NULL,
    `serial_number` VARCHAR(20) NULL,
    `tanggal_pembelian` DATETIME(3) NOT NULL,
    `expired` DATETIME(3) NULL,
    `unit` INTEGER NOT NULL,
    `owner` TEXT NOT NULL,
    `status` ENUM('Dipinjam', 'Maintenance', 'Tersedia') NOT NULL DEFAULT 'Tersedia',

    UNIQUE INDEX `Barang_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pinjaman` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15) NOT NULL,
    `unit` INTEGER NOT NULL,
    `status` ENUM('Dipinjam', 'Maintenance', 'Tersedia') NOT NULL DEFAULT 'Dipinjam',

    UNIQUE INDEX `Pinjaman_id_key`(`id`),
    UNIQUE INDEX `Pinjaman_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
