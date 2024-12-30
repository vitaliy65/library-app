USE [master]
GO
/****** Object:  Database [Library_network]    Script Date: 30.12.2024 19:43:21 ******/
CREATE DATABASE [Library_network]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Library_network', FILENAME = N'D:\programs\SQL server\MSSQL16.SQLEXPRESS01\MSSQL\DATA\Library_network.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Library_network_log', FILENAME = N'D:\programs\SQL server\MSSQL16.SQLEXPRESS01\MSSQL\DATA\Library_network_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Library_network] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Library_network].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Library_network] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Library_network] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Library_network] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Library_network] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Library_network] SET ARITHABORT OFF 
GO
ALTER DATABASE [Library_network] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Library_network] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Library_network] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Library_network] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Library_network] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Library_network] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Library_network] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Library_network] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Library_network] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Library_network] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Library_network] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Library_network] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Library_network] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Library_network] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Library_network] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Library_network] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Library_network] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Library_network] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Library_network] SET  MULTI_USER 
GO
ALTER DATABASE [Library_network] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Library_network] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Library_network] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Library_network] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Library_network] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Library_network] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Library_network] SET QUERY_STORE = ON
GO
ALTER DATABASE [Library_network] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Library_network]
GO
/****** Object:  User [ReadWriteUser]    Script Date: 30.12.2024 19:43:22 ******/
CREATE USER [ReadWriteUser] FOR LOGIN [ReadWriteUser] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [ReadOnlyUser]    Script Date: 30.12.2024 19:43:22 ******/
CREATE USER [ReadOnlyUser] FOR LOGIN [ReadOnlyUser] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [DBAdmin]    Script Date: 30.12.2024 19:43:22 ******/
CREATE USER [DBAdmin] FOR LOGIN [DBAdmin] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [ReadWriteUser]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [ReadWriteUser]
GO
ALTER ROLE [db_datareader] ADD MEMBER [ReadOnlyUser]
GO
ALTER ROLE [db_owner] ADD MEMBER [DBAdmin]
GO
/****** Object:  Table [dbo].[Books]    Script Date: 30.12.2024 19:43:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Books](
	[book_id] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](255) NOT NULL,
	[author_id] [int] NULL,
	[publication_year] [int] NULL,
	[copies] [int] NOT NULL,
	[status] [varchar](20) NOT NULL,
	[genre_id] [int] NULL,
	[library_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[book_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Issuances]    Script Date: 30.12.2024 19:43:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Issuances](
	[issuance_id] [int] IDENTITY(1,1) NOT NULL,
	[issuance_date] [date] NOT NULL,
	[user_id] [int] NULL,
	[book_id] [int] NULL,
	[return_date] [date] NULL,
	[librarian_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[issuance_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserRoles]    Script Date: 30.12.2024 19:43:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRoles](
	[user_role_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[role] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[user_role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 30.12.2024 19:43:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[full_name] [varchar](255) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[email] [varchar](max) NULL,
	[phone] [varchar](max) NULL,
	[password] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[ReaderBooks]    Script Date: 30.12.2024 19:43:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ReaderBooks] AS
SELECT 
    u.user_id,
    u.full_name AS ReaderName,
    u.email AS ReaderEmail,
    b.book_id,
    b.title AS BookTitle,
    b.publication_year,
    i.issuance_date,
    i.return_date
FROM 
    Users u
JOIN 
    UserRoles ur ON u.user_id = ur.user_id
JOIN 
    Issuances i ON u.user_id = i.user_id
JOIN 
    Books b ON i.book_id = b.book_id
WHERE 
    ur.role = 'Reader';

GO
/****** Object:  Table [dbo].[Authors]    Script Date: 30.12.2024 19:43:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Authors](
	[author_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NOT NULL,
	[birth_year] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[author_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Genres]    Script Date: 30.12.2024 19:43:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Genres](
	[genre_id] [int] IDENTITY(1,1) NOT NULL,
	[genre_name] [varchar](100) NOT NULL,
	[genre_description] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[genre_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[genre_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Librarians]    Script Date: 30.12.2024 19:43:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Librarians](
	[librarian_id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](100) NOT NULL,
	[last_name] [varchar](100) NOT NULL,
	[position] [varchar](100) NULL,
	[library_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[librarian_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Libraries]    Script Date: 30.12.2024 19:43:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Libraries](
	[library_id] [int] IDENTITY(1,1) NOT NULL,
	[library_name] [varchar](255) NOT NULL,
	[address] [varchar](255) NOT NULL,
	[contact_number] [varchar](20) NULL,
	[working_hours] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[library_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Operations]    Script Date: 30.12.2024 19:43:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Operations](
	[operation_id] [int] IDENTITY(1,1) NOT NULL,
	[operation_type] [varchar](20) NOT NULL,
	[operation_date] [date] NOT NULL,
	[user_id] [int] NULL,
	[book_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[operation_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reservations]    Script Date: 30.12.2024 19:43:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reservations](
	[reservation_id] [int] IDENTITY(1,1) NOT NULL,
	[reservation_date] [date] NOT NULL,
	[user_id] [int] NULL,
	[book_id] [int] NULL,
	[status] [varchar](20) NOT NULL,
	[librarian_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[reservation_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Books]  WITH CHECK ADD FOREIGN KEY([author_id])
REFERENCES [dbo].[Authors] ([author_id])
GO
ALTER TABLE [dbo].[Books]  WITH CHECK ADD  CONSTRAINT [FK_Books_Genres] FOREIGN KEY([genre_id])
REFERENCES [dbo].[Genres] ([genre_id])
GO
ALTER TABLE [dbo].[Books] CHECK CONSTRAINT [FK_Books_Genres]
GO
ALTER TABLE [dbo].[Books]  WITH CHECK ADD  CONSTRAINT [FK_Books_Libraries] FOREIGN KEY([library_id])
REFERENCES [dbo].[Libraries] ([library_id])
GO
ALTER TABLE [dbo].[Books] CHECK CONSTRAINT [FK_Books_Libraries]
GO
ALTER TABLE [dbo].[Issuances]  WITH CHECK ADD FOREIGN KEY([book_id])
REFERENCES [dbo].[Books] ([book_id])
GO
ALTER TABLE [dbo].[Issuances]  WITH CHECK ADD FOREIGN KEY([librarian_id])
REFERENCES [dbo].[Librarians] ([librarian_id])
GO
ALTER TABLE [dbo].[Issuances]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[Librarians]  WITH CHECK ADD FOREIGN KEY([library_id])
REFERENCES [dbo].[Libraries] ([library_id])
GO
ALTER TABLE [dbo].[Reservations]  WITH CHECK ADD FOREIGN KEY([book_id])
REFERENCES [dbo].[Books] ([book_id])
GO
ALTER TABLE [dbo].[Reservations]  WITH CHECK ADD FOREIGN KEY([librarian_id])
REFERENCES [dbo].[Librarians] ([librarian_id])
GO
ALTER TABLE [dbo].[Reservations]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_UserRoles_Users] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[UserRoles] CHECK CONSTRAINT [FK_UserRoles_Users]
GO
ALTER TABLE [dbo].[Books]  WITH CHECK ADD CHECK  (([status]='checked out' OR [status]='reserved' OR [status]='available'))
GO
ALTER TABLE [dbo].[UserRoles]  WITH CHECK ADD  CONSTRAINT [CK__UserRoles__role__2BFE89A6] CHECK  (([role]='Reader' OR [role]='Librarian' OR [role]='Admin'))
GO
ALTER TABLE [dbo].[UserRoles] CHECK CONSTRAINT [CK__UserRoles__role__2BFE89A6]
GO
/****** Object:  StoredProcedure [dbo].[DecryptUserData]    Script Date: 30.12.2024 19:43:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Процедура дешифрування
CREATE PROCEDURE [dbo].[DecryptUserData]
    @UserId INT
AS
BEGIN
    -- Відкриття симетричного ключа
    OPEN SYMMETRIC KEY MySymmetricKey
    DECRYPTION BY CERTIFICATE MyCertificate;

    -- Отримання розшифрованих даних
    SELECT 
        user_id,
        CONVERT(VARCHAR(256), DECRYPTBYKEY(email)) AS Email,
        CONVERT(VARCHAR(50), DECRYPTBYKEY(phone)) AS Phone,
		CONVERT(VARCHAR(255), DECRYPTBYKEY(password)) AS Password
    FROM Users
    WHERE user_id = @UserId;

    -- Закриття ключа
    CLOSE SYMMETRIC KEY MySymmetricKey;
END;
GO
/****** Object:  StoredProcedure [dbo].[EncryptUserData]    Script Date: 30.12.2024 19:43:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[EncryptUserData]
    @UserId INT,
    @Email VARCHAR(255),
    @Phone VARCHAR(20),
    @Password VARCHAR(255)
AS
BEGIN
    -- Проверка длины строки для phone
    IF LEN(@Phone) > 50
    BEGIN
        RAISERROR('The phone number exceeds the allowed length of 50 characters.', 16, 1);
        RETURN;
    END

    -- Проверка длины строки для password
    IF LEN(@Password) > 255
    BEGIN
        RAISERROR('The password exceeds the allowed length of 255 characters.', 16, 1);
        RETURN;
    END

    -- Открытие симметричного ключа
    OPEN SYMMETRIC KEY MySymmetricKey
    DECRYPTION BY CERTIFICATE MyCertificate;

    -- Обновление зашифрованных данных
    UPDATE Users
    SET email = ENCRYPTBYKEY(KEY_GUID('MySymmetricKey'), @Email),
        phone = ENCRYPTBYKEY(KEY_GUID('MySymmetricKey'), @Phone),
        password = ENCRYPTBYKEY(KEY_GUID('MySymmetricKey'), @Password)
    WHERE user_id = @UserId;

    -- Закрытие ключа
    CLOSE SYMMETRIC KEY MySymmetricKey;
END;

GO
/****** Object:  StoredProcedure [dbo].[SaveOperation]    Script Date: 30.12.2024 19:43:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SaveOperation]
    @operation_type NVARCHAR(50), -- Тип операции (например, "Добавление", "Обновление", "Удаление")
    @user_id INT,                -- ID пользователя
    @book_id INT                 -- ID книги
AS
BEGIN
    BEGIN TRY
        -- Начало транзакции
        BEGIN TRANSACTION;

        -- Вставка новой операции в таблицу Operations
        INSERT INTO Operations (operation_type, operation_date, user_id, book_id)
        VALUES (@operation_type, GETDATE(), @user_id, @book_id);

        -- Фиксация транзакции
        COMMIT TRANSACTION;
        PRINT 'Операция успешно сохранена.';
    END TRY
    BEGIN CATCH
        -- В случае ошибки откатываем транзакцию
        ROLLBACK TRANSACTION;

        -- Вывод сообщения об ошибке
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        PRINT 'Ошибка при сохранении операции: ' + @ErrorMessage;
    END CATCH
END;

GO
USE [master]
GO
ALTER DATABASE [Library_network] SET  READ_WRITE 
GO
