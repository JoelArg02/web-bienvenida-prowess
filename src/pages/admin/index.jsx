import React from 'react';
import Link from 'next/link';
import { Container, ListGroup, ListGroupItem } from 'react-bootstrap';

const AdminDashboard = () => {
    return (
        <Container className="mt-5">
            <h1>Panel de Administración</h1>
            <ListGroup>
                <Link href="/admin/role" passHref>
                    <ListGroupItem action> Gestión de Roles </ListGroupItem>
                </Link>
                <Link href="/admin/users" passHref>
                    <ListGroupItem action> Gestión de Usuarios </ListGroupItem>
                </Link>
                <Link href="/admin/permissions" passHref>
                    <ListGroupItem action> Gestión de Permisos </ListGroupItem>
                </Link>
                <Link href="/admin/reports" passHref>
                    <ListGroupItem action> Reportes </ListGroupItem>
                </Link>
                <Link href="/admin/settings" passHref>
                    <ListGroupItem action> Configuraciones </ListGroupItem>
                </Link>
            </ListGroup>
        </Container>
    );
};

export default AdminDashboard;
