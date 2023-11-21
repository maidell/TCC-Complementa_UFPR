package br.ufpr.model;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "usuario", uniqueConstraints = { @UniqueConstraint(columnNames = { "email" }) })
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_usuario")
	private Long id;

	@Column(name = "nome")
	private String nome;

	@Column(name = "email")
	private String email;

	@Column(name = "telefone")
	private String telefone;

	@Column(name = "senha")
	private String senha;

	@Column(name = "salt")
	private String salt;

	@Column(name = "ativo")
	private boolean ativo;

	@Enumerated(EnumType.ORDINAL)
	@Column(name = "fk_id_papel")
	private Papel papel;

	public Usuario() {
	}

	public Usuario(Long id, String nome, String email, String telefone, String senha, Papel papel) {
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.telefone = telefone;
		this.senha = senha;
		this.papel = papel;
	}

	public Usuario(Long id, String nome, String email, String telefone, String senha, boolean ativo, Papel papel) {
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.telefone = telefone;
		this.senha = senha;
		this.ativo = ativo;
		this.papel = papel;
	}

	public Usuario(Long id, String nome, String email, String telefone, String senha, String salt, boolean ativo,
			Papel papel) {
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.telefone = telefone;
		this.senha = senha;
		this.salt = salt;
		this.ativo = ativo;
		this.papel = papel;
	}

	// Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public Papel getPapel() {
		return papel;
	}

	public void setPapel(Papel papel) {
		this.papel = papel;
	}

	public boolean isAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	@Override
	public String toString() {
		return "Usuario [id=" + id + ", nome=" + nome + ", email=" + email + ", telefone=" + telefone + ", senha="
				+ senha + ", ativo=" + ativo + ", papel=" + papel + "]";
	}
}
